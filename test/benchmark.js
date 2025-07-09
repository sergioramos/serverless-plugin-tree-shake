const Execa = require('execa');
const { stat, readdir, writeFile } = require('mz/fs');
const Reduce = require('apr-reduce');
const Main = require('apr-main');
const { extname, resolve } = require('node:path');
const PrettyBytes = require('pretty-bytes');
const PrettyMs = require('pretty-ms');
const Table = require('markdown-table');
const Setup = require('./setup.js');
const { name: pkgName } = require('../package.json');

Main(async () => {
  const results = await Reduce(
    await Setup(),
    async (memo, { name }) => {
      const root = resolve(__dirname, '__fixtures__', name);
      const output = resolve(root, '.serverless');

      // with tree-shake
      console.log('Packaging %s with tree-shake', name);
      const treeShakeStart = Date.now();
      await Execa('yarn', ['sls', 'package'], {
        stdio: 'inherit',
        cwd: root,
      });

      const treeShakeDuration = PrettyMs(Date.now() - treeShakeStart);
      const treeShakeSize = PrettyBytes(
        await Reduce(
          await readdir(output),
          async (memo, name) => {
            if (extname(name) !== '.zip') {
              return memo;
            }

            const { size } = await stat(resolve(output, name));
            return memo + size;
          },
          0,
        ),
      );

      console.log(
        'Packaged %s with tree-shake: %s, %s',
        name,
        treeShakeDuration,
        treeShakeSize,
      );

      // with default
      console.log('Packaging %s with default config', name);
      const defaultStart = Date.now();
      await Execa('yarn', ['sls', 'package'], {
        stdio: 'inherit',
        cwd: root,
        env: {
          ...process.env,
          DISABLE_TREE_SHAKE: '1',
        },
      });

      const defaultDuration = PrettyMs(Date.now() - defaultStart);
      const defaultSize = PrettyBytes(
        await Reduce(
          await readdir(output),
          async (memo, name) => {
            if (extname(name) !== '.zip') {
              return memo;
            }

            const { size } = await stat(resolve(output, name));
            return memo + size;
          },
          0,
        ),
      );

      console.log(
        'Packaged %s with default config: %s, %s',
        name,
        defaultDuration,
        defaultSize,
      );

      return memo.concat([
        {
          name: `${name} -> ${pkgName}`,
          size: treeShakeSize,
          duration: treeShakeDuration,
        },
        {
          name: `${name} -> default serverless`,
          size: defaultSize,
          duration: defaultDuration,
        },
      ]);
    },
    [],
  );

  const md = Table(
    [
      ['', 'Duration', 'Acc size'],
      ...results.map(({ name, size, duration }) => [name, duration, size]),
    ],
    {
      align: ['l', 'c', 'c'],
    },
  );

  console.log(md);
  await writeFile(resolve(__dirname, '../BENCHMARK.md'), md);
});
