# serverless-plugin-tree-shake

Shake the file dependency tree and only include files needed.

<div align="center">
  <img width="898" src="media/cover.svg" alt="serverless-plugin-tree-shake">
</div>

## install

```bash
yarn add --dev serverless-plugin-tree-shake
```

```bash
npm install --save-dev serverless-plugin-tree-shake
```

## usage

```yaml
plugins:
  - serverless-plugin-tree-shake
package:
  # no need to spend time excluding dev dependencies, given that
  # serverless-plugin-tree-shake does it already
  excludeDevDependencies: false
```

**example output before** (with `excludeDevDependencies` enabled):

```
$ time sls package
33.93s user 20.17s system 82% cpu 1:05.94 total
```

```
$ tree
988 directories, 5978 files
```

**example output after**:

```
$ time sls package
3.77s user 1.27s system 51% cpu 9.724 total
```

```
$ tree
24 directories, 48 files
```

More details: [`BENCHMARK.md`](./BENCHMARK.md).

##### typescript support

This plugins supports typescript natively. It uses the installed typescript package, reads the appropriate config, and transpiles to js according to that config. You can see examples on the [`__fixtures__`](./test/__fixtures__) that start with `ts-`.

##### individually

This plugins supports bundling functions `individually`. Just use that option accordingly:

```yaml
package:
  individually: true
  excludeDevDependencies: false
```

##### include and exclude

You can use the `include` and `exclude` global, and per-function, configurations and it will include/exclude the especified files/patterns.

## performance

Check out [`BENCHMARK.md`](./BENCHMARK.md) - auto generated.

## license

BSD-3-Clause
