import { link, mkdir, readdir, rm, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { series as ForEach } from 'apr-for-each';
import Intercept from 'apr-intercept';
import { execa } from 'execa';

export default async () => {
  const ls = await readdir(resolve(import.meta.dirname, '__fixtures__'), {
    withFileTypes: true,
  });

  const fixtures = ls.filter((entry) => entry.isDirectory());

  await ForEach(fixtures, async ({ name }) => {
    const root = resolve(import.meta.dirname, '__fixtures__', name);

    await Intercept(
      rm(resolve(root, 'plugin'), { recursive: true, force: true }),
    );
    await Intercept(mkdir(resolve(root, 'plugin')));
    await Intercept(
      rm(resolve(root, '.serverless'), { recursive: true, force: true }),
    );
    await Intercept(mkdir(resolve(root, '.serverless'), { recursive: true }));

    await link(
      resolve(import.meta.dirname, '../index.js'),
      resolve(root, 'plugin/index.js'),
    );

    await link(
      resolve(import.meta.dirname, '../package.json'),
      resolve(root, 'plugin/package.json'),
    );

    await Intercept(
      rm(resolve(root, '.yarn/cache'), { recursive: true, force: true }),
    );
    await Intercept(
      rm(resolve(root, '.yarn/unplugged'), { recursive: true, force: true }),
    );
    await Intercept(unlink(resolve(root, '.yarn/build-state.yml')));
    await Intercept(unlink(resolve(root, '.yarn/install-state.gz')));

    await execa('yarn', { stdio: 'inherit', cwd: root });
  });

  return fixtures;
};
