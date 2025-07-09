const Execa = require('execa');
const { series: ForEach } = require('apr-for-each');
const { readdir, rmdir, link, mkdir, unlink } = require('mz/fs');
const Intercept = require('apr-intercept');
const { resolve } = require('node:path');

module.exports = async () => {
  const ls = await readdir(resolve(__dirname, '__fixtures__'), {
    withFileTypes: true,
  });

  const fixtures = ls.filter((entry) => entry.isDirectory());

  await ForEach(fixtures, async ({ name }) => {
    const root = resolve(__dirname, '__fixtures__', name);

    await Intercept(rmdir(resolve(root, 'plugin'), { recursive: true }));
    await Intercept(mkdir(resolve(root, 'plugin')));
    await Intercept(rmdir(resolve(root, '.serverless'), { recursive: true }));
    await Intercept(mkdir(resolve(root, '.serverless'), { recursive: true }));

    await link(
      resolve(__dirname, '../index.js'),
      resolve(root, 'plugin/index.js'),
    );

    await link(
      resolve(__dirname, '../package.json'),
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
