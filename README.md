# serverless-plugin-tree-shake

Shake the file dependency tree and only include files needed.

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
  # no need to spend time doing excluding dev dependencies, given that
  # serverless-plugin-tree-shake does it already
  excludeDevDependencies: false
```

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

## todo

- [ ] tree shake handlers, not only the file tree
- [ ] add benchmarks

## license

BSD-3-Clause
