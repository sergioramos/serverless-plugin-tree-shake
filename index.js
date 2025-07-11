import {
  createWriteStream,
  existsSync,
  lstatSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import { stat as statAsync } from 'node:fs/promises';
import { createRequire } from 'node:module';
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  normalize,
  relative,
  resolve,
  sep,
} from 'node:path';
import { nodeFileTrace as FileTrace } from '@vercel/nft';
import Intercept from 'apr-intercept';
import Parallel from 'apr-parallel';
import archiver from 'archiver';
import { globby } from 'globby';
import Flatten from 'lodash.flatten';
import SortBy from 'lodash.sortby';
import ToPairs from 'lodash.topairs';
import Uniq from 'lodash.uniq';
import nanomatch from 'nanomatch';
import PathIsInside from 'path-is-inside';
import pkgUp from 'pkg-up';
import { writeSync } from 'tempy';

const require = createRequire(import.meta.url);

// Create async exists function since fs.exists was removed
const exists = async (filepath) => {
  try {
    await statAsync(filepath);
    return true;
  } catch {
    return false;
  }
};

// Import CommonJS modules that don't work well with ES module imports
const { default: Find } = require('apr-find');
const { default: MapFunc } = require('apr-map');
const { default: resDep } = require('@vercel/nft/out/resolve-dependency.js');

const zipService = require('osls/lib/plugins/package/lib/zip-service');
const packageService = require('osls/lib/plugins/package/lib/package-service');
const NativePkg = require('osls/lib/plugins/package/package');

const EXTENSIONS = ['.tsx', '.ts', '.node', '.mjs', '.cjs', '.js'];
const NODE_BUILTINS = [
  ...require('node:repl')._builtinLibs,
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

let pnp, locatorMap;
if ('pnp' in process.versions) {
  try {
    const {
      buildNodeModulesTree,
      buildLocatorMap,
    } = require('@yarnpkg/pnpify');

    pnp = require('pnpapi');
    locatorMap = buildLocatorMap(
      buildNodeModulesTree(pnp, { pnpifyFs: false }),
    );
  } catch (_err) {}
}

let tsAvailable = false;
try {
  // biome-ignore lint/correctness/noInnerDeclarations: we don't know if this module exists or not
  var {
    findConfigFile,
    flattenDiagnosticMessageText,
    parseJsonConfigFileContent,
    readConfigFile,
    sys,
    transpileModule,
  } = require('typescript');

  tsAvailable = true;
} catch (_e) {}

const getCompilerOptions = (entrypoint, servicePath) => {
  const filepath = findConfigFile(dirname(entrypoint), sys.fileExists);
  if (!filepath) {
    return {};
  }

  const { config, error } = readConfigFile(filepath, sys.readFile);
  if (error) {
    console.error(flattenDiagnosticMessageText(error.messageText, '\n'));
  }

  if (!config) {
    return {};
  }

  const { options: compilerOptions = {} } = parseJsonConfigFileContent(
    config,
    sys,
    servicePath,
    {},
    filepath,
  );

  return compilerOptions;
};

export default class {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.servicePath = serverless.config.servicePath || '';
    this.files = [];
    this.syms = [];

    this.nativeService = new NativePkg(serverless, options);

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
    const allFiles = await MapFunc(
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
  async zipFiles(files, zipFileName, prefix, filesToChmodPlusX, ...args) {
    if (files.length === 0) {
      throw new this.serverless.classes.Error('No files to package');
    }

    const { service } = this.serverless;
    const fn = (() => {
      try {
        return service.getFunction(zipFileName.replace(/\.zip$/, ''));
      } catch {
        return {};
      }
    })();

    const runtime = fn.runtime || service.provider.runtime;
    if (runtime && !/^nodejs/.test(runtime)) {
      return this.nativeService.zipFiles(
        files,
        zipFileName,
        prefix,
        filesToChmodPlusX,
        ...args,
      );
    }

    const zip = archiver.create('zip');
    // Create artifact in temp path and move it to the package path (if any) later
    const artifactFilePath = resolve(
      this.serverless.config.servicePath,
      '.serverless',
      zipFileName,
    );

    this.serverless.utils.writeFileDir(artifactFilePath);
    const output = createWriteStream(artifactFilePath);

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
      if (!locatorMap) {
        return;
      }

      try {
        const name = filePath.slice(prefix ? `${prefix}${sep}`.length : 0);

        const { name: key, reference } = pnp.findPackageLocator(name);
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
          await MapFunc(
            Uniq(files.map((pathname) => normalize(pathname))),
            (fullpath) => this.getFileContentAndStat(fullpath),
          ),
        );

        const pnpLinks = Flatten(contents.map(revertPnp)).filter(Boolean);
        SortBy(contents.concat(pnpLinks), ['filePath']).forEach((file) => {
          const { filePath, data, stat, ...rest } = file;
          let { mode } = stat;

          const name = filePath.slice(prefix ? `${prefix}${sep}`.length : 0);

          if (normalizedFilesToChmodPlusX?.includes(name) && mode % 2 === 0) {
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
    const { package: pkg = {}, handler, ...fn } = service.getFunction(fnName);
    const { include = [], exclude = [] } = pkg;

    const runtime = fn.runtime || service.provider.runtime;
    if (runtime && !/^nodejs/.test(runtime)) {
      return this.nativeService.resolveFilePathsFunction(fnName, ...args);
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

      const { outputText } = transpileModule(sys.readFile(pathname), {
        compilerOptions: getCompilerOptions(pathname, this.servicePath),
        fileName: basename(pathname),
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
        paths: [
          parent,
          dirname(parent),
          this.servicePath,
          import.meta.filename,
        ],
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

        return fallbackResolve(`./${join(id, 'index')}`, parent, {
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
      resolve: async (id, parent, job, isEsm) => {
        if (NODE_BUILTINS.includes(id)) {
          return `node:${id}`;
        }

        const [, defaultResolve] = await Intercept(
          resDep(id, parent, job, isEsm),
        );

        return defaultResolve ? defaultResolve : fallbackResolve(id, parent);
      },
    });

    warnings.forEach(({ message }) => {
      this.serverless.cli.log(message);
    });

    // Order is important, otherwise exclude flags will be overwritten
    const patterns = includes
      .concat(Array.from(fileList))
      .concat(
        excludes.map((p) => (p.charAt(0) === '!' ? p.substring(1) : `!${p}`)),
      );

    const allFilePaths = await globby(patterns, {
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
          (key) => (filePathStates[key] = !exclude),
        );
      });

    const filePaths = ToPairs(filePathStates)
      .filter((r) => r[1] === true)
      .map((r) => r[0]);

    if (filePaths.length === 0) {
      throw new this.serverless.classes.Error(
        'No file matches include / exclude patterns',
      );
    }

    const appendPkgs = async (filePaths) => {
      if (!locatorMap) {
        return filePaths;
      }

      return Uniq(
        Flatten(
          await MapFunc(filePaths, async (pathname) => {
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
}
