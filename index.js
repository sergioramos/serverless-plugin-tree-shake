const archiver = require('archiver');
const { readFileSync, lstatSync, realpathSync, ...fs } = require('fs');
const { exists, existsSync, stat: statAsync } = require('mz/fs');
const { nodeFileTrace: FileTrace } = require('@vercel/nft');
const { default: resDep } = require('@vercel/nft/out/resolve-dependency.js');
const Flatten = require('lodash.flatten');
const { default: Find } = require('apr-find');
const Globby = require('globby');
const { default: Map } = require('apr-map');
const nanomatch = require('nanomatch');
const Parallel = require('apr-parallel');
const { basename, dirname, extname, isAbsolute, sep, join } = require('path');
const { normalize, relative, resolve } = require('path');
const PathIsInside = require('path-is-inside');
const SortBy = require('lodash.sortby');
const ToPairs = require('lodash.topairs');
const { writeSync } = require('tempy');
const Uniq = require('lodash.uniq');
const pkgUp = require('pkg-up');

const zipService = require('serverless/lib/plugins/package/lib/zipService');
const packageService = require('serverless/lib/plugins/package/lib/packageService');

const EXTENSIONS = ['.tsx', '.ts', '.node', '.mjs', '.cjs', '.js'];
const NODE_BUILTINS = [
  ...require('repl')._builtinLibs,
  'fs/promises',
  'constants',
  'module',
  'timers',
  'console',
  '_stream_writable',
  '_stream_readable',
  '_stream_duplex',
  'process',
  'sys',
];

if ('pnp' in process.versions) {
  try {
    const {
      buildNodeModulesTree,
      buildLocatorMap,
    } = require('@yarnpkg/pnpify');

    // eslint-disable-next-line no-var, block-scoped-var
    var pnp = require('pnpapi');
    // eslint-disable-next-line no-var, block-scoped-var
    var locatorMap = buildLocatorMap(
      // eslint-disable-next-line block-scoped-var
      buildNodeModulesTree(pnp, { pnpifyFs: false }),
    );
  } catch (err) {
    console.error(err);
    // eslint-disable-next-line no-var, no-redeclare
    var locatorMap;
    // eslint-disable-next-line no-var, no-redeclare
    var pnp;
  }
}

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

    const [, transpiled] = cache || [];
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
      zipService.getFileContent.call(this, transpiled || realpath),
      statAsync(pathname),
    ]);

    const ext = extname(pathname);
    const filePath = relative(
      this.servicePath,
      resolve(
        this.servicePath,
        dirname(pathname),
        basename(pathname, ext),
      ).concat(['.ts', '.tsx'].includes(ext) ? '.js' : ext),
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

    const inferNodeModulesPath = ({ filePath, name, key }) => {
      const filePathParts = filePath.split(sep);
      const nameParts = name.split(sep);

      const nameIndex = nameParts.findIndex((namePart, nameIndex) => {
        return filePathParts.find((filePathPart, filePathIndex) => {
          return (
            filePathPart === namePart &&
            nameParts[nameIndex + 1] === filePathParts[filePathIndex + 1]
          );
        });
      });

      const sharedSize = /^@/.test(key) ? 3 : 2;

      return join(
        filePath,
        nameParts.slice(nameIndex + sharedSize, nameParts.length).join(sep),
      );
    };

    const revertPnp = ({ filePath }) => {
      // eslint-disable-next-line block-scoped-var
      if (!locatorMap) {
        return;
      }

      try {
        const name = filePath.slice(prefix ? `${prefix}${sep}`.length : 0);

        // eslint-disable-next-line block-scoped-var
        const { name: key, reference } = pnp.findPackageLocator(name);
        // eslint-disable-next-line block-scoped-var
        const { locations, target } = locatorMap.get(`${key}@${reference}`);
        const isSymlink = !/\.yarn\//.test(name);

        const fullTarget = isSymlink ? target : join(this.servicePath, name);
        const stat = lstatSync(fullTarget);
        const data = isSymlink ? Buffer.from('') : readFileSync(fullTarget);

        return locations.map((source) => {
          const relSymlink = isSymlink
            ? relative(this.servicePath, source)
            : '';

          if (isSymlink && relSymlink) {
            return {
              stat,
              filePath: relative(this.servicePath, source),
              data,
              type: 'symlink',
              linkname: relative(dirname(source), target),
            };
          }

          return {
            data,
            stat,
            filePath: inferNodeModulesPath({
              filePath: relative(this.servicePath, source),
              key,
              name,
            }),
            type: 'file',
          };
        });
      } catch ({ message }) {
        this.serverless.cli.log(message);
      }
    };

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

        const pnpLinks = Flatten(contents.map(revertPnp)).filter(Boolean);
        SortBy(contents.concat(pnpLinks), ['filePath']).forEach((file) => {
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

  async resolveFilePathsFunction(fnName, ...args) {
    const { service } = this.serverless;
    const { package: pkg = {}, handler, runtime } = service.getFunction(fnName);
    const { include = [], exclude = [] } = pkg;

    if (runtime && !/^nodejs/.test(runtime)) {
      return packageService.resolveFilePathsFunction.call(
        this,
        fnName,
        ...args,
      );
    }

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
      EXTENSIONS.map((ext) => entry.concat(ext)),
      (filename) => exists(filename),
    );

    const handleFile = (pathname) => {
      const realpath = realpathSync(pathname);
      const cache = this.files.find(([src]) => src === realpath);

      if (Array.isArray(cache)) {
        const [, fullpath] = cache;
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

    const nativeResolve = (id, parent) => {
      return require.resolve(id, {
        paths: [parent, dirname(parent), this.servicePath, __filename],
      });
    };

    const fallbackResolve = (id, parent, { previous } = {}) => {
      if (
        parent.split(sep).includes('node_modules') ||
        /^\.yarn/.test(relative(this.servicePath, parent))
      ) {
        return nativeResolve(id, parent);
      }

      if (
        isAbsolute(id) ||
        id === '.' ||
        id === '..' ||
        id.startsWith('./') ||
        id.startsWith('../')
      ) {
        const ext = extname(id);
        const entry = resolve(dirname(parent), ext ? basename(id, ext) : id);
        const resolved = EXTENSIONS.map((ext) => entry.concat(ext)).find(
          (filename) => {
            return existsSync(filename);
          },
        );

        if (resolved) {
          return resolved;
        }

        if (!resolved && previous) {
          return nativeResolve(previous, parent);
        }

        return fallbackResolve('./' + join(id, 'index'), parent, {
          tryAgain: false,
          previous: id,
        });
      }

      return nativeResolve(id, parent);
    };

    const { fileList = [], warnings } = await FileTrace([entrypoint], {
      base: this.servicePath,
      readLink: handleFile,
      readFile: handleFile,
      resolve: (id, parent, job, isESM) => {
        if (NODE_BUILTINS.includes(id)) {
          return `node:${id}`;
        }

        const [, defaultResolve] = (() => {
          try {
            return [null, resDep(id, parent, job, isESM)];
          } catch (err) {
            return [err];
          }
        })();

        return defaultResolve ? defaultResolve : fallbackResolve(id, parent);
      },
    });

    warnings.forEach(({ message }) => {
      this.serverless.cli.log(message);
    });

    // Order is important, otherwise exclude flags will be overwritten
    const patterns = includes
      .concat(fileList)
      .concat(
        excludes.map((p) => (p.charAt(0) === '!' ? p.substring(1) : `!${p}`)),
      );

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

    const appendPkgs = async (filePaths) => {
      // eslint-disable-next-line block-scoped-var
      if (!locatorMap) {
        return filePaths;
      }

      return Uniq(
        Flatten(
          await Map(filePaths, async (pathname) => {
            if (basename(pathname) === 'package.json') {
              return pathname;
            }

            return [
              pathname,
              relative(
                this.servicePath,
                await pkgUp({
                  cwd: dirname(join(this.servicePath, pathname)),
                }),
              ),
            ];
          }),
        ),
      );
    };

    const filePathsWPkgs = await appendPkgs(filePaths);

    // eslint-disable-next-line block-scoped-var
    if (tsAvailable) {
      filePathsWPkgs
        .filter((pathname) => {
          return !(
            pathname.split(sep).includes('node_modules') ||
            /^\.yarn/.test(pathname) ||
            basename(pathname) !== 'package.json'
          );
        })
        .forEach((pathname) => {
          const fullpath = join(this.servicePath, pathname);
          const pkg = require(fullpath);
          const { main } = pkg;

          if (!main) {
            return;
          }

          const ext = extname(main);
          if (!['.tsx', '.ts'].includes(ext)) {
            return;
          }

          const newPkg = {
            ...pkg,
            main: main.replace(/\.tsx|\.ts$/, ''),
          };

          this.files.push([
            fullpath,
            writeSync(JSON.stringify(newPkg, null, 2), {
              extension: '.json',
            }),
          ]);
        });
    }

    return SortBy(filePathsWPkgs, (pathname) => {
      return pathname.split(sep).includes('package.json');
    });
  }
};
