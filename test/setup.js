import { link, mkdir, readdir, rmdir, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { series as ForEach } from 'apr-for-each';
import Intercept from 'apr-intercept';
import Execa from 'execa';

export default async () => {
  const ls = await readdir(resolve(import.meta.dirname, '__fixtures__'), {
    withFileTypes: true,
  });

  const fixtures = ls.filter((entry) => entry.isDirectory());

  await ForEach(fixtures, async ({ name }) => {
    const root = resolve(import.meta.dirname, '__fixtures__', name);

    await Intercept(rmdir(resolve(root, 'plugin'), { recursive: true }));
    await Intercept(mkdir(resolve(root, 'plugin')));
    await Intercept(rmdir(resolve(root, '.serverless'), { recursive: true }));
    await Intercept(mkdir(resolve(root, '.serverless'), { recursive: true }));

    await link(
      resolve(import.meta.dirname, '../index.js'),
      resolve(root, 'plugin/index.js'),
    );

    await link(
      resolve(import.meta.dirname, '../package.json'),
      resolve(root, 'plugin/package.json'),
    );

    await Intercept(rmdir(resolve(root, '.yarn/cache'), { recursive: true }));
    await Intercept(
      rmdir(resolve(root, '.yarn/unplugged'), { recursive: true }),
    );
    await Intercept(unlink(resolve(root, '.yarn/build-state.yml')));
    await Intercept(unlink(resolve(root, '.yarn/install-state.gz')));

    await Execa('yarn', { stdio: 'inherit', cwd: root });
  });

  return fixtures;
};
