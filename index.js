const { existsSync, readFileSync, statAsync } = require('fs');
const FileTrace = require('@zeit/node-file-trace');
const Globby = require('globby');
const nanomatch = require('nanomatch');
const Parallel = require('apr-parallel');
const { basename, dirname, extname, relative, resolve, sep } = require('path');
const PathIsInside = require('path-is-inside');
const ToPairs = require('lodash.topairs');
const { writeSync } = require('tempy');

const zipService = require('serverless/lib/plugins/package/lib/zipService');
const packageService = require('serverless/lib/plugins/package/lib/packageService');

try {
  // eslint-disable-next-line no-var
  var {
    findConfigFile,
    flattenDiagnosticMessageText,
    parseJsonConfigFileContent,
    readConfigFile,
    sys,
    transpileModule,
  } = require('typescript');

  // eslint-disable-next-line no-var,block-scoped-var
  var tsAvailable = true;
  // eslint-disable-next-line no-unused-vars
} catch (e) {
  // eslint-disable-next-line no-var,block-scoped-var,no-redeclare
  var tsAvailable = false;
}

const getCompilerOptions = (entrypoint, servicePath) => {
  // eslint-disable-next-line block-scoped-var
  const filepath = findConfigFile(dirname(entrypoint), sys.fileExists);
  if (!filepath) {
    return {};
  }

  // eslint-disable-next-line block-scoped-var
  const { config, error } = readConfigFile(filepath, sys.readFile);
  if (error) {
    // eslint-disable-next-line block-scoped-var
    console.error(flattenDiagnosticMessageText(error.messageText, '\n'));
  }

  if (!config) {
    return {};
  }

  // eslint-disable-next-line block-scoped-var
  const { options: compilerOptions = {} } = parseJsonConfigFileContent(
    config,
    // eslint-disable-next-line block-scoped-var
    sys,
    servicePath,
    {},
    filepath,
  );

  return compilerOptions;
};

module.exports = class {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.servicePath = serverless.config.servicePath || '';
    this.files = [];

    if (options.package) {
      this.packagePath = options.package;
    } else if (serverless.service.package.path) {
      this.packagePath = serverless.service.package.path;
    } else {
      this.packagePath = resolve(this.servicePath || '.', '.serverless');
    }

    Object.keys(packageService).forEach((fnName) => {
      this[fnName] = this[fnName]
        ? this[fnName]
        : (...args) => packageService[fnName].call(this, ...args);
    });

    Object.keys(zipService).forEach((fnName) => {
      this[fnName] = this[fnName]
        ? this[fnName]
        : (...args) => zipService[fnName].call(this, ...args);
    });

    this.hooks = {
      'before:package:createDeploymentArtifacts': () => {
        return this.packageService();
      },
      'before:package:function:package': () => {
        if (!options.function) {
          throw new Error('Function name must be set');
        }

        this.serverless.cli.log(`Packaging function: ${options.function}...`);
        return this.packageFunction(options.function);
      },
    };
  }

  resolveFilePathsAll(...args) {
    this.serverless.cli.log('resolveFilePathsAll', ...args);
    throw new Error('todo');
  }

  async getFileContentAndStat(pathname) {
    const fullpath = resolve(this.servicePath, pathname);
    const cache = this.files.find(([src]) => src === fullpath);

    if (!Array.isArray(cache)) {
      return zipService.getFileContentAndStat.call(this, pathname);
    }

    const [, transpiled] = cache;
    if (!transpiled) {
      return zipService.getFileContentAndStat.call(this, pathname);
    }

    const [data, stat] = await Promise.all([
      // Get file contents and stat in parallel
      zipService.getFileContent.call(this, transpiled),
      statAsync(transpiled),
    ]);

    return {
      data,
      stat,
      filePath: relative(
        this.servicePath,
        resolve(
          this.servicePath,
          dirname(pathname),
          basename(pathname, extname(pathname)),
        ).concat('.js'),
      ),
    };
  }

  async resolveFilePathsFunction(fnName) {
    const { service } = this.serverless;
    const { package: pkg = {}, handler } = service.getFunction(fnName);
    const { include = [], exclude = [] } = pkg;

    const { excludes, includes } = await Parallel({
      excludes: async () => this.getExcludes(exclude, true),
      includes: async () => this.getIncludes(include),
    });

    const entry = resolve(
      this.servicePath,
      dirname(handler),
      basename(handler, extname(handler)),
    );

    const entrypoint = ['.tsx', '.ts', '.js']
      .map((ext) => entry.concat(ext))
      .find((filename) => existsSync(filename));

    const { fileList = [] } = await FileTrace([entrypoint], {
      base: this.servicePath,
      readFile: (path) => {
        // eslint-disable-next-line block-scoped-var
        if (!tsAvailable) {
          return readFileSync(path, 'utf-8');
        }

        if (!['.ts', '.tsx'].includes(extname(path))) {
          return readFileSync(path, 'utf-8');
        }

        if (
          !PathIsInside(path, this.servicePath) &&
          path.split(sep).includes(['node_modules'])
        ) {
          return readFileSync(path, 'utf-8');
        }

        // eslint-disable-next-line block-scoped-var
        const { outputText } = transpileModule(sys.readFile(path), {
          compilerOptions: getCompilerOptions(path, this.servicePath),
        });

        this.files.push([
          path,
          writeSync(outputText, {
            extension: '.js',
          }),
        ]);

        return outputText;
      },
    });

    const patterns = excludes
      .map((p) => (p.charAt(0) === '!' ? p.substring(1) : `!${p}`))
      .concat(includes)
      .concat(fileList);

    const allFilePaths = await Globby(patterns, {
      cwd: this.servicePath,
      dot: true,
      silent: true,
      follow: true,
      nodir: true,
    });

    // from https://github.com/serverless/serverless/blob/af3fbf0402054d39be2b758568553381ff0246d2/lib/plugins/package/lib/packageService.js#L257-L274
    const filePathStates = allFilePaths.reduce(
      (p, c) => Object.assign(p, { [c]: true }),
      {},
    );

    patterns
      // nanomatch only does / style path delimiters, so convert them if on windows
      .map((p) => (process.platform === 'win32' ? p.replace(/\\/g, '/') : p))
      .forEach((p) => {
        const exclude = p.startsWith('!');
        const pattern = exclude ? p.slice(1) : p;
        return nanomatch(allFilePaths, [pattern], { dot: true }).forEach(
          // eslint-disable-next-line no-return-assign
          (key) => (filePathStates[key] = !exclude),
        );
      });

    const filePaths = ToPairs(filePathStates)
      .filter((r) => r[1] === true)
      .map((r) => r[0]);

    if (filePaths.length !== 0) {
      return filePaths;
    }

    throw new this.serverless.classes.Error(
      'No file matches include / exclude patterns',
    );
  }
};
