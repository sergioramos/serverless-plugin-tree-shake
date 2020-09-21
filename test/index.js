const test = require('ava');
const Tree = require('directory-tree');
const Execa = require('execa');
const { series: ForEach } = require('apr-for-each');
const Flatten = require('lodash.flatten');
const { readlinkSync } = require('fs');
const { readFile, rmdir } = require('mz/fs');
const Intercept = require('apr-intercept');
const { basename, dirname, extname, join, resolve, relative } = require('path');
const { isSymlinkSync } = require('path-type');
const Reduce = require('apr-reduce');
const Setup = require('./setup');

const EVENT = {
  httpMethod: 'GET',
};

const normalizeTree = ({ path, type, children = [] }) => {
  const fullpath = relative(__dirname, path);
  const isSymlink = isSymlinkSync(path);
  const link = isSymlink ? ` -> ${readlinkSync(path)}` : '';

  return Flatten(
    [`${type} ${fullpath}${link}`].concat(children.map(normalizeTree)),
  ).sort();
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

for (const pnp of [true, false]) {
  for (const typescript of [true, false]) {
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

          t.snapshot(normalizeTree(Tree(rootCwd)));
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

            t.snapshot(normalizeTree(Tree(cwd)));
            t.snapshot(outputs);
          }

          t.snapshot(await require(fullpath)[fn](EVENT));
        });
      });
    }
  }
}
