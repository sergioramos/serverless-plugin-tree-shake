const test = require('ava');
const Tree = require('directory-tree');
const Execa = require('execa');
const { series: ForEach } = require('apr-for-each');
const { readlinkSync } = require('fs');
const { readFile, rmdir } = require('mz/fs');
const { fromFileSync } = require('hasha');
const Intercept = require('apr-intercept');
const { basename, dirname, extname, join, resolve, relative } = require('path');
const { isSymlinkSync } = require('path-type');
const Reduce = require('apr-reduce');
const SortBy = require('lodash.sortby');
const Setup = require('./setup');

const EVENT = {
  httpMethod: 'GET',
};

const normalizeTree = ({ path, type, name, children = [] }) => {
  const isSymlink = isSymlinkSync(path);
  const isDirectory = type === 'directory';

  return {
    path: relative(__dirname, path),
    children: SortBy(children.map(normalizeTree), 'path'),
    isSymlink,
    link: isSymlink ? readlinkSync(path) : undefined,
    md5: isDirectory ? undefined : fromFileSync(path, { algorithm: 'md5' }),
    type,
    name,
  };
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

test('typescript + workspaces', async (t) => {
  const root = resolve(__dirname, '__fixtures__/ts-ws-all');
  const serverless = resolve(root, '.serverless');
  const { service, functions } = require(resolve(root, 'serverless'));
  const cwd = join(serverless, service);

  await rmdir(cwd, { recursive: true });
  await decompress(`${service}.zip`, serverless);

  t.snapshot(normalizeTree(Tree(cwd)));
  t.snapshot(await readOutputs(functions, cwd));

  await ForEach(Object.keys(functions), async (service) => {
    const { handler } = functions[service];
    const [fullpath, fn] = getFn(handler, cwd);
    t.snapshot(await require(fullpath)[fn](EVENT));
  });
});

test('individual > typescript + workspaces', async (t) => {
  const root = resolve(__dirname, '__fixtures__/ts-ws-individual');
  const serverless = resolve(root, '.serverless');
  const { functions } = require(resolve(root, 'serverless'));

  await ForEach(Object.keys(functions), async (service) => {
    const cwd = join(serverless, service);
    await rmdir(cwd, { recursive: true });
    await decompress(`${service}.zip`, serverless);
    const { handler } = functions[service];
    const [fullpath, fn] = getFn(handler, cwd);

    t.snapshot(normalizeTree(Tree(cwd)));
    t.snapshot(await readOutputs({ [service]: functions[service] }, cwd));
    t.snapshot(await require(fullpath)[fn](EVENT));
  });
});

test('javascript + workspaces', async (t) => {
  const root = resolve(__dirname, '__fixtures__/ws-all');
  const serverless = resolve(root, '.serverless');
  const { service, functions } = require(resolve(root, 'serverless'));
  const cwd = join(serverless, service);

  await rmdir(cwd, { recursive: true });
  await decompress(`${service}.zip`, serverless);

  t.snapshot(normalizeTree(Tree(cwd)));
  t.snapshot(await readOutputs(functions, cwd));

  await ForEach(Object.keys(functions), async (service) => {
    const { handler } = functions[service];
    const [fullpath, fn] = getFn(handler, cwd);
    t.snapshot(await require(fullpath)[fn](EVENT));
  });
});

test('individual > javascript + workspaces', async (t) => {
  const root = resolve(__dirname, '__fixtures__/ws-individual');
  const serverless = resolve(root, '.serverless');
  const { functions } = require(resolve(root, 'serverless'));

  await ForEach(Object.keys(functions), async (service) => {
    const cwd = join(serverless, service);
    await rmdir(cwd, { recursive: true });
    await decompress(`${service}.zip`, serverless);
    const { handler } = functions[service];
    const [fullpath, fn] = getFn(handler, cwd);

    t.snapshot(normalizeTree(Tree(cwd)));
    t.snapshot(await readOutputs({ [service]: functions[service] }, cwd));
    t.snapshot(await require(fullpath)[fn](EVENT));
  });
});
