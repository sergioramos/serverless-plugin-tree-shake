const { http } = require('framework');
const handler = require('./handler')

module.exports.handler = http(handler);
