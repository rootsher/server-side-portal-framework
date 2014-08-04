'use strict';

var path = '../../Web/Handlers/';

module.exports.loginGet = require(path + 'login.get.js').loginGet;
module.exports.loginPost = require(path + 'login.post.js').loginPost;

module.exports.registerGet = require(path + 'register.get.js').registerGet;
module.exports.registerPost = require(path + 'register.post.js').registerPost;

module.exports.secretGet = require(path + 'secret.get.js').secretGet;

module.exports.accessDenied = require(path + 'accessDenied.get.js').accessDenied;