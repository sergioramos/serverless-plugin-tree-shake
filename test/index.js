const test = require('ava');
const Tree = require('directory-tree');
const Execa = require('execa');
const { series: ForEach } = require('apr-for-each');
const Flatten = require('lodash.flatten');
const { readlinkSync, realpathSync, lstatSync } = require('fs');
const { readFile, rmdir } = require('mz/fs');
const Intercept = require('apr-intercept');
const PathIsInside = require('path-is-inside');
const { isSymlinkSync } = require('path-type');
const Reduce = require('apr-reduce');
const SortBy = require('lodash.sortby');
const Uniq = require('lodash.uniq');
const Setup = require('./setup');

const {
  basename,
  dirname,
  extname,
  join,
  resolve,
  relative,
  sep,
} = require('path');

const EVENT = {
  httpMethod: 'GET',
};

const serializeTree = (children = []) => {
  return Uniq(
    children.map(({ type, pathname, source }) => {
      const link = source ? `-> ${source}` : '';
      return `${type} ${pathname}${link}`;
    }),
  );
};

const normalizeTree = ({ path: fullpath, type, children = [] }, root) => {
  const pathname = relative(root, fullpath);
  const realpath = realpathSync(fullpath);
  const isDiff = realpath !== fullpath;
  const isInside = PathIsInside(realpath, root);
  const hasSymlink = isDiff && isInside;

  const target = hasSymlink
    ? fullpath.split(sep).reduceRight((memo, _, i, arr) => {
        if (memo) {
          return memo;
        }

        const partial = arr.slice(0, i).join(sep);
        if (!PathIsInside(partial, root)) {
          return memo;
        }

        const lstat = lstatSync(partial);
        if (!lstat.isSymbolicLink()) {
          return memo;
        }

        return join(realpathSync(partial), arr.slice(i, arr.length).join(sep));
      }, '') || realpath
    : realpath;

  const isSymlink = isSymlinkSync(fullpath);
  const stat = lstatSync(fullpath);
  const source = isSymlink
    ? readlinkSync(fullpath)
    : hasSymlink && fullpath !== target
    ? relative(stat.isDirectory() ? fullpath : dirname(fullpath), target)
    : null;

  return SortBy(
    Flatten(
      children
        .map((child) => normalizeTree(child, root))
        .concat([{ type, pathname, source }]),
    ).filter(({ pathname }) => pathname),
    'pathname',
  );
};

const decompress = async (file, cwd) => {
  const [err] = await Intercept(
    Execa(
      'unzip',
      ['-u', file, '-d', join(cwd, basename(file, extname(file)))],
      {
        cwd,
      },
    ),
  );

  if (err && err.exitCode === 1) {
    throw new Error(err.message);
  }
};

const readOutputs = async (functions, cwd) => {
  return Reduce(
    Object.entries(functions),
    async (memo, [name, { handler }]) => {
      const [fullpath] = getFn(handler, cwd);
      return Object.assign(memo, {
        [name]: await readFile(fullpath, 'utf-8'),
      });
    },
    {},
  );
};

const getFn = (handler, cwd) => {
  return [
    resolve(cwd, dirname(handler), basename(handler, extname(handler))).concat(
      '.js',
    ),
    extname(handler).replace(/^\./, ''),
  ];
};

test.before(async () => {
  await ForEach(await Setup(), async ({ name }) => {
    const root = resolve(__dirname, '__fixtures__', name);
    await Execa('yarn', ['sls', 'package'], { stdio: 'inherit', cwd: root });
  });
});

for (const typescript of [false, true]) {
  for (const pnp of [false, true]) {
    for (const individually of [true, false]) {
      const name = [
        typescript ? 'ts' : 'js',
        pnp ? 'pnp' : 'nm',
        individually ? 'individually' : 'single',
      ].join('-');

      test(name, async (t) => {
        const root = resolve(__dirname, '__fixtures__', name);
        const serverless = resolve(root, '.serverless');
        const { service, functions } = require(resolve(root, 'serverless'));
        const rootCwd = join(serverless, service);

        if (!individually) {
          await rmdir(rootCwd, { recursive: true });
          await decompress(`${service}.zip`, serverless);

          t.snapshot(serializeTree(normalizeTree(Tree(rootCwd), rootCwd)));
          t.snapshot(await readOutputs(functions, rootCwd));
        }

        await ForEach(Object.keys(functions), async (service) => {
          const cwd = join(serverless, service);
          const { handler } = functions[service];
          const [fullpath, fn] = getFn(handler, individually ? cwd : rootCwd);

          if (individually) {
            await rmdir(cwd, { recursive: true });
            await decompress(`${service}.zip`, serverless);
            const outputs = await readOutputs(
              { [service]: functions[service] },
              cwd,
            );

            t.snapshot(serializeTree(normalizeTree(Tree(cwd), cwd)));
            t.snapshot(outputs);
          }

          t.snapshot(await require(fullpath)[fn](EVENT));
        });
      });
    }
  }
}
