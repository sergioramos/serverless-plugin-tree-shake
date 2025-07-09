const { name: service } = require('./package.json');

const DISABLE_TREE_SHAKE = Boolean(
  JSON.parse(process.env.DISABLE_TREE_SHAKE || '0'),
);
module.exports = {
  frameworkVersion: '3',
  service,
  plugins: [DISABLE_TREE_SHAKE ? false : './plugin'].filter(Boolean),
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
  },
  package: {
    individually: true,
    // we don't need this because of tree-shake
    excludeDevDependencies: DISABLE_TREE_SHAKE,
  },
  functions: {
    hello: {
      handler: 'handlers/hello/index.handler',
      events: [
        {
          httpApi: {
            method: 'GET',
            path: '/hello',
          },
        },
      ],
    },
    world: {
      handler: 'handlers/world/index.handler',
      events: [
        {
          httpApi: {
            method: 'GET',
            path: '/world',
          },
        },
      ],
    },
  },
};
