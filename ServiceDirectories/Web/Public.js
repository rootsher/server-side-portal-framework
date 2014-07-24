var path = '../../Web/Handlers/';

module.exports.loginGet = require(path + 'login.get.js').loginGet;
module.exports.secretGet = require(path + 'secret.get.js').secretGet;

module.exports.accessDenied = require(path + 'accessDenied.get.js').accessDenied;