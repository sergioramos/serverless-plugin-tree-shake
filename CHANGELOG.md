## [2.0.1](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v2.0.0...v2.0.1) (2025-09-03)

### Chores

- normalize package.json ([73db74b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/73db74b4365b7f545b21f8786ee9daf3f17def89))
- upgrade dependencies ([b1384a9](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b1384a99e3571342dc1b9955c5ba01b1a64ef24c))
- upgrade peer dependencies ([29a1f61](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/29a1f617316bae0fe4af289e97b6e12b9792503e))

### Code Style

- don't return on `.forEach` ([78a693b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/78a693b5470966bf254e6bb5715efdcad30c3afc))

### Continuous Integration

- add `release` config ([20e9592](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/20e9592a418e00c318ff39946fd76297167f0172))
- add permissions to action ([d358909](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d358909fa69eae430b6e66efc68588313fea919a))
- remove npm for dependabot ([45624a9](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/45624a9e12dee9df577dd3ff446e18d7d9f228b2))
- update default branch to `main` ([6065dba](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6065dbadfb0548cecb682225977f3c13a9e847e3))
- upgrade actions/checkout ([49544bd](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/49544bd30bbe3513ba3885133edc60d3029376a2))

# [2.0.0](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.11...v2.0.0) (2025-07-12)

### Bug Fixes

- gracefully handle non-existing dirs when trying to rm ([0ad64b6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/0ad64b67d17a63374c813417cf54f23807f58c94))
- inline source maps file name on ts ([d864ec1](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d864ec1940cc4218f5a82e827ca80af680d931ac))
- upgrade `directory-tree` to `^3` ([9751598](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/97515987b5d46741c2b338e1bb8b1a3bc10175c8))

### Chores

- **deps:** bump actions/cache from 2.1.4 to 3.0.2 ([59f4848](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/59f48481ee3875d869137dffdfe6314ffcdd42f7))
- **deps:** bump actions/checkout from 2 to 3 ([32a58d5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/32a58d5a6265976b2c7b64bfa3e24bcd6b9e552c))
- **deps:** bump actions/setup-node from 2.1.5 to 3.2.0 ([9159b3c](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9159b3cfa93231f362cf92ba385ca260dc6cd232))
- **deps:** bump ridedott/release-me-action from 3.5.16 to 3.6.39 ([35f5b17](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/35f5b17d799f58785f0b6b4f333ad131274c77a1))
- **deps:** bump rlespinasse/github-slug-action from 3.5.1 to 4.2.4 ([92117b7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/92117b7d8ebe62e28f582830d229ad10b32b76e2))
- **deps:** bump technote-space/auto-cancel-redundant-job ([83a3c22](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/83a3c2261bae3faf065b3d28b3ad47ee21ea1513))
- **deps:** bump technote-space/auto-cancel-redundant-job ([4ef88c6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/4ef88c6c640bcd769bba58a7e5118e166bebf639))
- **deps:** bump wagoid/commitlint-github-action from 3.1.0 to 4.1.12 ([5cda7da](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/5cda7dad7be90f91d103abf02b2e42e8092a4679))
- migrate from `eslint` + `prettier` to `biome` ([6246b82](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6246b82ae0d72c614142765b8b41b10e651a4758))
- migrate project from CommonJS to ES modules ([e142aac](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e142aac35cdcf9100eec5094bb94a11a90d7615a))
- upgrade `@commitlint/*` to `^19` ([9135e09](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9135e09785334b3c57cb947fb0dc8919f16a388b))
- upgrade `@vercel/nft` to `^0.29` ([d1f3c2f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d1f3c2f9c455e42c09662bce927c472b38b239d9))
- upgrade `execa` to `^9` ([7d3d9f6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/7d3d9f60b3f22bb2b5e081d317489e463ff4d23f))
- upgrade `globby` to `^14` ([5c52604](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/5c52604d95f51e90d240b2c69dc855dbbc2ce83e))
- upgrade `lint-staged` to `^16` ([e3d8d0c](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e3d8d0c9550d0f3f9d2cd792c9d19623c9d8a4df))
- upgrade `markdown-table` to `^3` ([6cb2a36](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6cb2a3607cd710c2d3d29d50b80939478f1430b2))
- upgrade `path-type` to `^6` ([cfca25c](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/cfca25ca84ca423a15a5b00e5fbcefd34b9466bd))
- upgrade `pkg-up` to `package-up@^5` ([30a5f72](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/30a5f72ab142147a2608aea78b373e6f337ba475))
- upgrade `pretty-bytes` to `^7` ([d84afad](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d84afad95bdc6a4c132d33a945f6a1421d2bf03e))
- upgrade `tempy` to `^2` ([c6f451c](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/c6f451c68fba35d87ac4f698eedc71b8d455b187))
- upgrade to `archiver^7` ([b3288ca](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b3288cad576fb35dee343465b5492eff79aaa1a0))
- upgrade to `typescript^5` ([6a39eb7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6a39eb7e60f888c64195a43d491a72e8cc28c610))
- upgrade to `yarn^4` ([a804b67](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/a804b67c61976d38448fee4dde85f0b1dcfb6a23))
- upgrade`pretty-ms` to `^9` ([751393f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/751393f23ed0e81463c23083c898c2fb4533c657))

### Continuous Integration

- remove release rules ([65b51e3](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/65b51e3a68a864f7a75d92ce24b60f506412f4cc))
- upgrade all GitHub Actions to latest versions ([9b62e11](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9b62e118aa792e5dd8583b0c6f48173ef8ab913d))
- upgrade node to lts ([4d1f736](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/4d1f7363dec019f8fbd21a080472a115ddeb681b))

### Documentation

- add AGENT.md and CLAUDE.md ([cd3e4ad](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/cd3e4ad2640b707187977c85836ca2af6de85926))
- add reference to `osls` ([d3551ff](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d3551ffc8890d9432ed6ba40f50a9ef1bd1aaeb1))
- document commit rules ([714e304](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/714e304a36c860df749f3cbb31a122dbb1309d78))

### Features

- upgrade dependencies ([e053ff8](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e053ff8566ca6719feabe3e45f4af1cc076775eb))

### Other

- chore!: upgrade to osls (serverless v3 fork) and remove NCC support ([88c6405](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/88c640564acd375640a13627fb3b46e216788b06))

### Tests

- migrate from `ava` to Node.js test runner ([2d7a9bb](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/2d7a9bb7919bf00af2d3ee9f00293406b4070a26))

### BREAKING CHANGE

- new yarn version, which _can_ change the tree output.

Functional results are the same, but the tree outputs are different.

## [1.1.11](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.10...v1.1.11) (2021-04-09)

### Bug Fixes

- fallback to sls when runtime is not node, at service and fn level ([eb25809](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/eb258093e2f71a164c75975c206e936ee9adf800))

## [1.1.10](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.9...v1.1.10) (2021-04-09)

### Bug Fixes

- ignore non-nodejs functions ([39bf104](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/39bf104d0148dfb30bce105a2dd9437a6b40992d))

### Chores

- **deps:** bump ridedott/release-me-action from v3.5.11 to v3.5.16 ([2783c43](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/2783c431322c22173d181958cf19c0f394f85371))
- **deps:** bump rlespinasse/github-slug-action from 3.4.0 to 3.5.1 ([4aa68c0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/4aa68c0bef48176890136967adfaefb6d4ba11ca))
- **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([b1d0408](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b1d0408da347b13626ffad287b1759464dd4f801))
- upgrade dependencies ([22134b3](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/22134b31683b4daecc98dbfe159fd73f271bcabc))

## [1.1.9](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.8...v1.1.9) (2021-03-25)

### Bug Fixes

- handle fs/promises ([16b32ee](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/16b32ee5c576f80d2faf223200b92c25076defd2))

### Chores

- upgrade dependencies ([b72c738](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b72c7381e54a8adb189b8926daf6f463644c623f))
- **deps:** bump ridedott/release-me-action from v3.5.10 to v3.5.11 ([2baeabb](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/2baeabbaad4a47b190231df73867a043c8bbb460))

## [1.1.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.7...v1.1.8) (2021-03-11)

### Chores

- upgrade dependencies ([4fd4a64](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/4fd4a6414e0b8fabf290492c2b23c2b57012a397))

## [1.1.7](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.6...v1.1.7) (2021-03-11)

### Bug Fixes

- handle empty rel on symlinks ([fc5c0dd](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/fc5c0ddf7e62f9665e855e5257b9e15ba796ceb1))

### Chores

- **deps:** bump actions/cache from v2.1.3 to v2.1.4 ([493c34f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/493c34fc714f370c3ab87efcf463f7c60a7ff8b6))
- **deps:** bump actions/setup-node from v2.1.4 to v2.1.5 ([1b5bf55](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1b5bf5564577b6ad9d0739f9e8278a15b3c4b7eb))
- **deps:** bump ridedott/release-me-action from v3.4.2 to v3.5.10 ([106c51a](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/106c51acf3723ad89679d0de6fe467230d7f04a4))
- **deps:** bump rlespinasse/github-slug-action from 3.2.0 to 3.4.0 ([2a59a34](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/2a59a349bb4a2db0446b7b824e7914cbb61ac6de))
- **deps:** bump wagoid/commitlint-github-action from v2.1.6 to v3.0.6 ([cbdd2db](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/cbdd2db8f10e564fe86f88c72436b8f08477dbbb))

## [1.1.6](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.5...v1.1.6) (2021-01-13)

### Chores

- **deps-dev:** bump actions/setup-node from v2.1.2 to v2.1.4 ([ea262c0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ea262c0cf8393cb11b6a75edf9ccb6294d2740cb))
- **deps-dev:** bump ridedott/release-me-action from v3.2.12 to v3.4.2 ([33c14af](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/33c14af595b26e934f61392ee5432e7f06543a14))
- **deps-dev:** bump rlespinasse/github-slug-action from 3.1.0 to 3.2.0 ([eb73cc5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/eb73cc5fa268f66221b7e8e1dc6537c3279b3d0a))
- **deps-dev:** bump wagoid/commitlint-github-action from v2.1.2 to v2.1.6 ([092f5bc](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/092f5bc91f96614f2ae30dae6108a341d93b487b))
- restore original ncc as it is a peer dep ([f9851df](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/f9851df824eb5f2cab01ea6abf1132b7134815f8))
- upgrade dependencies ([26f3fbd](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/26f3fbd04cba324c1b04497e24720b27781cf8ea))
- upgrade yarn ([dc08b82](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/dc08b82211b0b413890e708f61551e42439f89d9))

### Code Style

- format coc ([c644a81](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/c644a81de02bf74ea1ba2238f1a485783c4311e1))

### Tests

- cleanup tree outputs ([11ee91f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/11ee91f696af751c44d88a70abed5dd419bfd94b))

## [1.1.5](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.4...v1.1.5) (2020-11-24)

### Chores

- upgrade dependencies ([d2f8688](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d2f8688bb4d7819f168f5bb4336d15f14a18f9fe))
- **deps-dev:** bump ridedott/release-me-action from v3.2.11 to v3.2.12 ([b13c7eb](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b13c7eb2fc84503d5c19cbbd04a30ed5cae15332))
- **deps-dev:** bump wagoid/commitlint-github-action from v2.1.1 to v2.1.2 ([8eeb105](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/8eeb105c0357a48df43ede214992af97853ea230))

## [1.1.4](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.3...v1.1.4) (2020-11-20)

### Chores

- **deps:** upgrade dependencies ([2477aa9](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/2477aa97d03bb3ee54035aec2f273b1a68853f6b))
- **deps-dev:** bump actions/cache from v2.1.2 to v2.1.3 ([470c346](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/470c34620fff560391e6c3996249b76a7dc86abb))
- **deps-dev:** bump eslint from 7.11.0 to 7.12.0 ([1e8e3d3](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1e8e3d345dd82709b7a9da16f4f35aae7507f1fe))
- **deps-dev:** bump eslint-config-prettier from 6.12.0 to 6.13.0 ([d770151](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d770151003ad86006cf3e80b531bc309f57296eb))
- **deps-dev:** bump execa from 4.0.3 to 4.1.0 ([503ecb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/503ecb071d384067d2e15e0e79d1e0341126e914))
- **deps-dev:** bump lint-staged from 10.4.1 to 10.4.2 ([c589301](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/c5893010a83c37a20c589d888821464c154dc42d))
- **deps-dev:** bump ridedott/release-me-action from v3.2.3 to v3.2.11 ([8944bb3](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/8944bb35a5eba297adbf729c36c117455e59395b))
- **deps-dev:** bump rlespinasse/github-slug-action from 2.1.1 to 3.1.0 ([006d1e8](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/006d1e8077620c38da2f7024f00e5c7a3d927cee))
- **deps-dev:** bump wagoid/commitlint-github-action from v2.0.2 to v2.1.1 ([27140b7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/27140b719fcbd39337d3b75157e623ff68bc5ca0))
- **deps-dev:** upgrade yarn ([b26a55c](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b26a55caa6f01eeb95b0bc62826d853f5015ef6d))

### Continuous Integration

- add commitlint config ([e6e2945](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e6e29458537e06d9eb556b833b1f7ffbf973adcd))

## [1.1.3](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.2...v1.1.3) (2020-10-16)

### Chores

- **deps-dev:** bump lint-staged from 10.4.0 to 10.4.1 ([3af0cc1](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3af0cc125f3b8845f40611f527c1f9c79fa6d6b0))
- **deps-dev:** bump ridedott/release-me-action from v3.2.2 to v3.2.3 ([bc15e1d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/bc15e1dd8facbecfae92d0a6b7e75529948d2a49))

### Continuous Integration

- don't release on deps-dev scope ([8d964d4](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/8d964d46ad02e84d05b8ad444b6c6934590467eb))

## [1.1.2](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.1...v1.1.2) (2020-10-13)

### Bug Fixes

- file excluding ([a32218f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/a32218f2d0c86fc152da18e6f5f399721f8abf64))

### Chores

- **deps:** bump actions/cache from v2.1.1 to v2.1.2 ([fe26f06](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/fe26f061efc1b966f75f5df675f89f2b5a3634f0))
- **deps:** bump actions/setup-node from v2.1.1 to v2.1.2 ([5130154](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/513015498ddc4c50afb604e9fcb44cbf46163c81))
- **deps:** bump rlespinasse/github-slug-action from 2.1.0 to 2.1.1 ([f031f78](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/f031f78249bebfa21d9f4f4c163818f760f209c3))
- **deps:** bump tempy from 0.7.0 to 0.7.1 ([95e596f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/95e596ffda4f98c1c57a291b336a1901eea63b1a))
- **deps:** upgrade dependencies ([b286741](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b2867416af3c7c989ea9cc7aa284a7beb38efabf))
- **deps-dev:** bump ava from 3.12.1 to 3.13.0 ([2969107](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/296910736550c55185ef2cee12d2e322c0375259))
- **deps-dev:** bump eslint from 7.9.0 to 7.10.0 ([57729e2](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/57729e269efc8a259cafd7f62d4e71b13e7e24e1))
- **deps-dev:** bump eslint-config-prettier from 6.11.0 to 6.12.0 ([618fa8a](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/618fa8a1b05ac7eb63c9f7721ba8bab5d1b9169e))
- **deps-dev:** bump pretty-ms from 7.0.0 to 7.0.1 ([e71049a](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e71049ae9bbcd07228dbf376ac1ae9108076e12f))
- **deps-dev:** upgrade ridedott/release-me-action ([01f1df1](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/01f1df1c9a694ed028a42eee519a710288980da3))

### Continuous Integration

- don't release on deps-dev ([95b6cd6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/95b6cd611e7c9dd33cf1aa9238ce22c2670f14b0))

### Tests

- apply alphanum-sort ([dc1d992](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/dc1d992e0ae81fed383e50c248579cf52072d5a8))

## [1.1.1](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.1.0...v1.1.1) (2020-09-22)

### Bug Fixes

- improve pnp support, specially with ts ([20a1c5e](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/20a1c5e10c3d269b3dbecda87c9b69209a08aa56))

# [1.1.0](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.1.0) (2020-09-21)

### Chores

- **deps:** bump @vercel/nft from 0.9.0 to 0.9.1 ([c79c5d6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/c79c5d6cdc994077605279055694eac834d136da))
- **deps:** bump archiver from 5.0.0 to 5.0.1 ([400bc12](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/400bc12cbfa9a7c9601767b61aa031088e052ba9))
- **deps:** bump tempy from 0.6.0 to 0.7.0 ([f81e002](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/f81e0022f818c811a58ce024177985f51063f3b2))
- **deps-dev:** bump eslint from 7.7.0 to 7.8.0 ([3575bf0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3575bf0240a4a58bff61f5de34ab95cd38ed7a16))
- **deps-dev:** bump eslint from 7.8.0 to 7.8.1 ([1a01123](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1a01123e5eb5e0d4da9c9b51d41b58fa1cfcbdc6))
- **deps-dev:** bump husky from 4.2.5 to 4.3.0 ([0fa1ca7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/0fa1ca77abb75d350e4dbdfe29d0809ae8c642f4))
- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump lint-staged from 10.2.13 to 10.3.0 ([448bd6f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/448bd6f27b0ae1bf66e5cd1613fbcb94de467d9b))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **deps-dev:** bump prettier from 2.1.1 to 2.1.2 ([ec27054](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ec270548ec0f64888944766f726549b2239c183f))
- **deps-dev:** bump pretty-bytes from 5.3.0 to 5.4.0 ([3e34635](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3e3463521e2a55d47251f0f0bec53563cfe6e0c3))
- **deps-dev:** bump pretty-bytes from 5.4.0 to 5.4.1 ([86c027e](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86c027ed9ecc9d4d0671aa1097fab9654f3a7f41))
- **release:** v1.0.8 ([4fac7ca](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/4fac7ca3e48d8de3facda9baa4582935a6f525ea))
- **release:** v1.0.8 ([6a0ca5d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6a0ca5d5a3ffdf4c37916c4427bd157cb61c6ee5))
- **release:** v1.0.8 ([b3b339d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b3b339d0a3e570d5180055ff25b19e3f4cf86edc))
- **release:** v1.0.8 ([fabd030](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/fabd030f7256272bcd041487ccfd3ecf4c4b047d))
- **release:** v1.0.8 ([86697d5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86697d5a62b35d3bbe5cb3ab8d8af6ae8cea0cde))
- **release:** v1.0.8 ([6e45cb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6e45cb0e2ba7b2a790decfb4e1b871c08962b28f))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

### Features

- add proper support for pnp ([391c91d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/391c91d38c3411d7dad673544edcf88ee7266dc8))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-09-16)

### Chores

- **deps:** bump @vercel/nft from 0.9.0 to 0.9.1 ([c79c5d6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/c79c5d6cdc994077605279055694eac834d136da))
- **deps:** bump archiver from 5.0.0 to 5.0.1 ([400bc12](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/400bc12cbfa9a7c9601767b61aa031088e052ba9))
- **deps:** bump tempy from 0.6.0 to 0.7.0 ([f81e002](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/f81e0022f818c811a58ce024177985f51063f3b2))
- **deps-dev:** bump eslint from 7.7.0 to 7.8.0 ([3575bf0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3575bf0240a4a58bff61f5de34ab95cd38ed7a16))
- **deps-dev:** bump eslint from 7.8.0 to 7.8.1 ([1a01123](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1a01123e5eb5e0d4da9c9b51d41b58fa1cfcbdc6))
- **deps-dev:** bump husky from 4.2.5 to 4.3.0 ([0fa1ca7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/0fa1ca77abb75d350e4dbdfe29d0809ae8c642f4))
- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump lint-staged from 10.2.13 to 10.3.0 ([448bd6f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/448bd6f27b0ae1bf66e5cd1613fbcb94de467d9b))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **deps-dev:** bump prettier from 2.1.1 to 2.1.2 ([ec27054](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ec270548ec0f64888944766f726549b2239c183f))
- **deps-dev:** bump pretty-bytes from 5.3.0 to 5.4.0 ([3e34635](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3e3463521e2a55d47251f0f0bec53563cfe6e0c3))
- **deps-dev:** bump pretty-bytes from 5.4.0 to 5.4.1 ([86c027e](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86c027ed9ecc9d4d0671aa1097fab9654f3a7f41))
- **release:** v1.0.8 ([6a0ca5d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6a0ca5d5a3ffdf4c37916c4427bd157cb61c6ee5))
- **release:** v1.0.8 ([b3b339d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b3b339d0a3e570d5180055ff25b19e3f4cf86edc))
- **release:** v1.0.8 ([fabd030](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/fabd030f7256272bcd041487ccfd3ecf4c4b047d))
- **release:** v1.0.8 ([86697d5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86697d5a62b35d3bbe5cb3ab8d8af6ae8cea0cde))
- **release:** v1.0.8 ([6e45cb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6e45cb0e2ba7b2a790decfb4e1b871c08962b28f))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-09-14)

### Chores

- **deps:** bump @vercel/nft from 0.9.0 to 0.9.1 ([c79c5d6](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/c79c5d6cdc994077605279055694eac834d136da))
- **deps:** bump archiver from 5.0.0 to 5.0.1 ([400bc12](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/400bc12cbfa9a7c9601767b61aa031088e052ba9))
- **deps:** bump tempy from 0.6.0 to 0.7.0 ([f81e002](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/f81e0022f818c811a58ce024177985f51063f3b2))
- **deps-dev:** bump eslint from 7.7.0 to 7.8.0 ([3575bf0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3575bf0240a4a58bff61f5de34ab95cd38ed7a16))
- **deps-dev:** bump eslint from 7.8.0 to 7.8.1 ([1a01123](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1a01123e5eb5e0d4da9c9b51d41b58fa1cfcbdc6))
- **deps-dev:** bump husky from 4.2.5 to 4.3.0 ([0fa1ca7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/0fa1ca77abb75d350e4dbdfe29d0809ae8c642f4))
- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump lint-staged from 10.2.13 to 10.3.0 ([448bd6f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/448bd6f27b0ae1bf66e5cd1613fbcb94de467d9b))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **deps-dev:** bump pretty-bytes from 5.3.0 to 5.4.0 ([3e34635](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3e3463521e2a55d47251f0f0bec53563cfe6e0c3))
- **deps-dev:** bump pretty-bytes from 5.4.0 to 5.4.1 ([86c027e](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86c027ed9ecc9d4d0671aa1097fab9654f3a7f41))
- **release:** v1.0.8 ([b3b339d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b3b339d0a3e570d5180055ff25b19e3f4cf86edc))
- **release:** v1.0.8 ([fabd030](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/fabd030f7256272bcd041487ccfd3ecf4c4b047d))
- **release:** v1.0.8 ([86697d5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86697d5a62b35d3bbe5cb3ab8d8af6ae8cea0cde))
- **release:** v1.0.8 ([6e45cb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6e45cb0e2ba7b2a790decfb4e1b871c08962b28f))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-09-02)

### Chores

- **deps-dev:** bump eslint from 7.7.0 to 7.8.0 ([3575bf0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3575bf0240a4a58bff61f5de34ab95cd38ed7a16))
- **deps-dev:** bump eslint from 7.8.0 to 7.8.1 ([1a01123](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1a01123e5eb5e0d4da9c9b51d41b58fa1cfcbdc6))
- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **deps-dev:** bump pretty-bytes from 5.3.0 to 5.4.0 ([3e34635](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3e3463521e2a55d47251f0f0bec53563cfe6e0c3))
- **deps-dev:** bump pretty-bytes from 5.4.0 to 5.4.1 ([86c027e](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86c027ed9ecc9d4d0671aa1097fab9654f3a7f41))
- **release:** v1.0.8 ([fabd030](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/fabd030f7256272bcd041487ccfd3ecf4c4b047d))
- **release:** v1.0.8 ([86697d5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86697d5a62b35d3bbe5cb3ab8d8af6ae8cea0cde))
- **release:** v1.0.8 ([6e45cb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6e45cb0e2ba7b2a790decfb4e1b871c08962b28f))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-09-01)

### Chores

- **deps-dev:** bump eslint from 7.7.0 to 7.8.0 ([3575bf0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3575bf0240a4a58bff61f5de34ab95cd38ed7a16))
- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **deps-dev:** bump pretty-bytes from 5.3.0 to 5.4.0 ([3e34635](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3e3463521e2a55d47251f0f0bec53563cfe6e0c3))
- **deps-dev:** bump pretty-bytes from 5.4.0 to 5.4.1 ([86c027e](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86c027ed9ecc9d4d0671aa1097fab9654f3a7f41))
- **release:** v1.0.8 ([86697d5](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/86697d5a62b35d3bbe5cb3ab8d8af6ae8cea0cde))
- **release:** v1.0.8 ([6e45cb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6e45cb0e2ba7b2a790decfb4e1b871c08962b28f))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-08-31)

### Chores

- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **deps-dev:** bump pretty-bytes from 5.3.0 to 5.4.0 ([3e34635](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3e3463521e2a55d47251f0f0bec53563cfe6e0c3))
- **release:** v1.0.8 ([6e45cb0](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6e45cb0e2ba7b2a790decfb4e1b871c08962b28f))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-08-26)

### Chores

- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **deps-dev:** bump prettier from 2.1.0 to 2.1.1 ([9d2e912](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/9d2e91252e44d43921f7fc632803277de76765af))
- **release:** v1.0.8 ([ac40618](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ac40618b9f3fae91fcdc74f9711ba52b26bfe2c1))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-08-25)

### Chores

- **deps-dev:** bump lint-staged from 10.2.12 to 10.2.13 ([b60c49b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/b60c49bc69be6444c6376bcd6cc0807b9a894a97))
- **release:** v1.0.8 ([ba1620d](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/ba1620ddef2b43b5cfe78482c25d09aac50e01dc))

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))
- update actions through dependabot ([d416f23](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d416f23a2d3e6f234acad8085d8a6bb59dc28cfc))

## [1.0.8](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.7...v1.0.8) (2020-08-25)

### Continuous Integration

- fix dependabot push ([e0a9afe](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e0a9afedc282b0ffe2b64521511b21ca34a0c78a))

## [1.0.7](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.6...v1.0.7) (2020-08-25)

### Continuous Integration

- revert yarn.lock before trying to fix it ([76f2817](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/76f2817dc93d363a4c05886666371049170af23f))

## [1.0.6](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.5...v1.0.6) (2020-08-25)

### Continuous Integration

- add dependabot support ([6c0dd99](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6c0dd99159a75969ec17726b8c9aa0d1f1e4cd0f))

## [1.0.5](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.4...v1.0.5) (2020-08-19)

### Bug Fixes

- _try_ to gracefully handle berry pnp ([84e9bce](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/84e9bce7c8ab055b558847e693fcc2d08b867298))

### Chores

- migrate to nft ([36f71bf](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/36f71bf2fc567169ef7223e96c955789df812807))

### Documentation

- add code of conduct ([1f555d7](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1f555d7aa3e71b61ec4e04b38760414b1efc3943))
- remove todo ([6f16dde](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6f16dde9e94bff203be1ca74bcb081d5dbc7f3b7))

## [1.0.4](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.3...v1.0.4) (2020-08-17)

### Chores

- upgrade dependencies ([7d0bd0b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/7d0bd0b7e3883e3cd03632f88782465dcceb93f3))

## [1.0.3](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.2...v1.0.3) (2020-06-14)

### Documentation

- add cover image ([d4bbb0a](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/d4bbb0a9a27a98dd0f77bf1196fd09eddce57b77))

## [1.0.2](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.1...v1.0.2) (2020-06-14)

### Documentation

- add license file ([90b8c91](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/90b8c91bde86a91b597a3ce647575e0db47321fc))

## [1.0.1](https://github.com/sergioramos/serverless-plugin-tree-shake/compare/v1.0.0...v1.0.1) (2020-06-14)

### Chores

- add benchmark ([e130641](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e130641800b25bbb940bae5be92e918f11b3ef5a))

# 1.0.0 (2020-06-13)

### Chores

- enable release and publish ([229c947](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/229c947ab823207d8fcbea8b55c8295187ae1e95))
- fix lint-staged prettier cmd ([e6ddf9b](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e6ddf9b0e56233cad62eb372a8088b206f13ae28))
- re-enable tests on CI ([3673f8f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3673f8f3e1bcb3f2c7a1ee8c7e3e708dc58c3edd))

### Documentation

- add README ([3bfbc5f](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/3bfbc5f32d7ded9bd068fc6e63a9f51202604077))

### Features

- add support to `packageAll` ([1b955dd](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/1b955dd2e59015859f515a17285d630c517fbbac))
- first commit ([f9766ee](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/f9766eecfe67bda70dcb2473ea9c5ea7a47af936))
- support workspaces ([e7d27c3](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/e7d27c3a56f9cbc07f2affc670c8674088c2f7ae))

### Tests

- add tests ([6abca25](https://github.com/sergioramos/serverless-plugin-tree-shake/commit/6abca257c1cd53c4e6f4c03a5a83de6b5a90bf91))
