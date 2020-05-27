const { name: service } = require('./package.json');

module.exports = {
  service,
  plugins: ['./plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
  },
  package: {
    individually: false,
    // we don't need this because of tree-shake
    excludeDevDependencies: false,
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
