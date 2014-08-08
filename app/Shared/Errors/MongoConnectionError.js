'use strict';

var util = require('util');

function MongoConnectionError(error) {
    this.name = 'MongoConnectionError';
    this.message = error;
}
util.inherits(MongoConnectionError, Error);

module.exports.MongoConnectionError = MongoConnectionError;