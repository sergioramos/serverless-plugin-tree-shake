import { lstatSync, readlinkSync, realpathSync } from 'node:fs';
import { readFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import {
  basename,
  dirname,
  extname,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { before, test } from 'node:test';
import { series as ForEach } from 'apr-for-each';
import Intercept from 'apr-intercept';
import Reduce from 'apr-reduce';
import Tree from 'directory-tree';
import { execa } from 'execa';
import Flatten from 'lodash.flatten';
import SortBy from 'lodash.sortby';
import Uniq from 'lodash.uniq';
import PathIsInside from 'path-is-inside';
import { isSymlinkSync } from 'path-type';
import Setup from './setup.js';

const require = createRequire(import.meta.url);

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
    execa(
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

before(async () => {
  await ForEach(await Setup(), async ({ name }) => {
    const root = resolve(import.meta.dirname, '__fixtures__', name);
    await execa('yarn', ['sls', 'package'], {
      stdio: 'inherit',
      cwd: root,
      env: {
        SLS_DEBUG: '*',
      },
    });
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
        const root = resolve(import.meta.dirname, '__fixtures__', name);
        const serverless = resolve(root, '.serverless');
        const { service, functions } = require(resolve(root, 'serverless.js'));
        const rootCwd = join(serverless, service);

        if (!individually) {
          await Intercept(rm(rootCwd, { recursive: true, force: true }));
          await decompress(`${service}.zip`, serverless);

          t.assert.snapshot(await readOutputs(functions, rootCwd));
          t.assert.snapshot(
            serializeTree(
              normalizeTree(Tree(rootCwd, { attributes: ['type'] }), rootCwd),
            ),
          );
        }

        await ForEach(Object.keys(functions), async (service) => {
          const cwd = join(serverless, service);
          const { handler } = functions[service];
          const [fullpath, fn] = getFn(handler, individually ? cwd : rootCwd);

          if (individually) {
            await Intercept(rm(cwd, { recursive: true, force: true }));
            await decompress(`${service}.zip`, serverless);
            const outputs = await readOutputs(
              { [service]: functions[service] },
              cwd,
            );

            t.assert.snapshot(outputs);
            t.assert.snapshot(
              serializeTree(
                normalizeTree(Tree(cwd, { attributes: ['type'] }), cwd),
              ),
            );
          }

          t.assert.snapshot(await require(fullpath)[fn](EVENT));
        });
      });
    }
  }
}
