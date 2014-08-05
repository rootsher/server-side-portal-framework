'use strict';

var redis = require('redis');
var util = require('util');


// ### Errors ###

function RedisConnectionError(error) {
    this.name = 'RedisConnectionError';
    this.message = error;
}
util.inherits(RedisConnectionError, Error);

// ### Adapter class ###

function RedisAdapter() {
    this.client = redis.createClient();
    this.client.on('error', function (error) {
       throw new RedisConnectionError(error); 
    });
}

RedisAdapter.prototype.connect = function () {
    var self = this;

    // Function retained for backwards compatibility to prevent API breakage. Feel free to refactor and remove.
    return function (req, res, next) {
        next();
    };
};

module.exports.RedisAdapter = RedisAdapter;
