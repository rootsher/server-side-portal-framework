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

module.exports.RedisAdapter = RedisAdapter;
