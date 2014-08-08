'use strict';

var util = require('util');

function RedisConnectionError(error) {
    this.name = 'RedisConnectionError';
    this.message = error;
}
util.inherits(RedisConnectionError, Error);

module.exports.RedisConnectionError = RedisConnectionError;