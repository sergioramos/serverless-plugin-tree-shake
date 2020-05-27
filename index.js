const archiver = require('archiver');
const { readFileSync, lstatSync, realpathSync, ...fs } = require('fs');
const { exists, stat: statAsync } = require('mz/fs');
const FileTrace = require('@zeit/node-file-trace');
const Flatten = require('lodash.flatten');
const { default: Find } = require('apr-find');
const Globby = require('globby');
const { default: Map } = require('apr-map');
const nanomatch = require('nanomatch');
const Parallel = require('apr-parallel');
const { basename, dirname, extname, sep } = require('path');
const { normalize, relative, resolve } = require('path');
const PathIsInside = require('path-is-inside');
const SortBy = require('lodash.sortby');
const ToPairs = require('lodash.topairs');
const { writeSync } = require('tempy');
const Uniq = require('lodash.uniq');

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
    this.syms = [];

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

  async resolveFilePathsAll() {
    const allFiles = await Map(
      this.serverless.service.getAllFunctions(),
      (fnName) => {
        return this.resolveFilePathsFunction(fnName);
      },
    );

    return Uniq(
      SortBy(Flatten(allFiles), (pathname) => {
        return pathname.split(sep).includes('package.json');
      }),
    );
  }

  async getFileContentAndStat(pathname) {
    const fullpath = resolve(this.servicePath, pathname);
    const realpath = realpathSync(fullpath);
    const cache = this.files.find(([src]) => src === realpath);

    const prevSym = this.syms.find(({ target }) => {
      return PathIsInside(fullpath, target);
    });

    if (prevSym) {
      const { source, target, ...entry } = prevSym;
      return [
        entry,
        await this.getFileContentAndStat(relative(this.servicePath, realpath)),
      ];
    }

    if (!Array.isArray(cache)) {
      return zipService.getFileContentAndStat.call(this, pathname);
    }

    const [, transpiled] = cache;
    if (!transpiled) {
      return zipService.getFileContentAndStat.call(this, pathname);
    }

    const isDiff = realpath !== fullpath;
    const isInside = PathIsInside(realpath, this.servicePath);
    const hasSymlink = isDiff && isInside;

    if (hasSymlink) {
      const symlink = fullpath.split(sep).reduceRight((memo, _, i, arr) => {
        if (memo) {
          return memo;
        }

        const partial = arr.slice(0, i).join(sep);
        if (!PathIsInside(partial, this.servicePath)) {
          return memo;
        }

        const lstat = lstatSync(partial);
        if (!lstat.isSymbolicLink()) {
          return memo;
        }

        const source = realpathSync(partial);
        const slstat = lstatSync(source);
        if (!slstat.isDirectory()) {
          return memo;
        }

        return {
          source: realpathSync(partial),
          target: partial,
        };
      }, null);

      if (symlink) {
        const { source, target } = symlink;

        const entry = {
          stat: lstatSync(target),
          filePath: relative(
            this.servicePath,
            resolve(this.servicePath, target),
          ),
          data: Buffer.from(''),
          type: 'symlink',
          linkname: relative(dirname(target), source),
        };

        this.syms.push({ source, target, ...entry });
        return entry;
      }
    }

    const [data, stat] = await Promise.all([
      // Get file contents and stat in parallel
      zipService.getFileContent.call(this, transpiled),
      statAsync(pathname),
    ]);

    const filePath = relative(
      this.servicePath,
      resolve(
        this.servicePath,
        dirname(pathname),
        basename(pathname, extname(pathname)),
      ).concat('.js'),
    );

    return {
      filePath,
      data,
      stat,
    };
  }

  // from: https://github.com/serverless/serverless/blob/f93b27bf684d9a14b1e67ec554a7719ca3628135/lib/plugins/package/lib/zipService.js#L65-L116
  async zipFiles(files, zipFileName, prefix, filesToChmodPlusX) {
    if (files.length === 0) {
      throw new this.serverless.classes.Error('No files to package');
    }

    const zip = archiver.create('zip');
    // Create artifact in temp path and move it to the package path (if any) later
    const artifactFilePath = resolve(
      this.serverless.config.servicePath,
      '.serverless',
      zipFileName,
    );

    this.serverless.utils.writeFileDir(artifactFilePath);
    const output = fs.createWriteStream(artifactFilePath);

    return new Promise((resolve, reject) => {
      output.on('close', () => resolve(artifactFilePath));
      output.on('error', (err) => reject(err));
      zip.on('error', (err) => reject(err));

      return output.on('open', async () => {
        zip.pipe(output);

        const normalizedFilesToChmodPlusX =
          filesToChmodPlusX &&
          Uniq(filesToChmodPlusX.map((file) => normalize(file)));

        const contents = Flatten(
          await Map(
            Uniq(files.map((pathname) => normalize(pathname))),
            (fullpath) => this.getFileContentAndStat(fullpath),
          ),
        );

        SortBy(contents, ['filePath']).forEach((file) => {
          const { filePath, data, stat, ...rest } = file;
          let { mode } = stat;

          const name = filePath.slice(prefix ? `${prefix}${sep}`.length : 0);

          if (
            normalizedFilesToChmodPlusX &&
            normalizedFilesToChmodPlusX.includes(name) &&
            mode % 2 === 0
          ) {
            mode += 1;
          }

          zip.append(data, {
            name,
            mode,
            // necessary to get the same hash when zipping the same content
            date: new Date(0),
            ...rest,
          });
        });

        zip.finalize();
      });
    });
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

    const entrypoint = await Find(
      ['.tsx', '.ts', '.js'].map((ext) => entry.concat(ext)),
      (filename) => exists(filename),
    );

    const handleFile = (pathname) => {
      const realpath = realpathSync(pathname);
      const cache = this.files.find(([src]) => src === realpath);

      if (Array.isArray(cache)) {
        const [fullpath] = cache;
        if (fullpath) {
          return readFileSync(fullpath, 'utf-8');
        }
      }

      // eslint-disable-next-line block-scoped-var
      if (!tsAvailable) {
        return readFileSync(pathname, 'utf-8');
      }

      if (!['.ts', '.tsx'].includes(extname(pathname))) {
        return readFileSync(pathname, 'utf-8');
      }

      if (
        !PathIsInside(pathname, this.servicePath) ||
        pathname.split(sep).includes(['node_modules'])
      ) {
        return readFileSync(pathname, 'utf-8');
      }

      // eslint-disable-next-line block-scoped-var
      const { outputText } = transpileModule(sys.readFile(pathname), {
        compilerOptions: getCompilerOptions(pathname, this.servicePath),
      });

      this.files.push([
        pathname,
        writeSync(outputText, {
          extension: '.js',
        }),
      ]);

      return outputText;
    };

    const { fileList = [] } = await FileTrace([entrypoint], {
      base: this.servicePath,
      readLink: handleFile,
      readFile: handleFile,
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

    if (!filePaths.length) {
      throw new this.serverless.classes.Error(
        'No file matches include / exclude patterns',
      );
    }

    return SortBy(filePaths, (pathname) => {
      return pathname.split(sep).includes('package.json');
    });
  }
};
