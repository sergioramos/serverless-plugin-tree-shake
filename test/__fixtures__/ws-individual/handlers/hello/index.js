const { http } = require('framework');
const { statusCode } = require('out');

module.exports.handler = http(async () => {
  return { statusCode };
});
