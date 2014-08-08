'use strict';

var redis = require('redis');
var RedisConnectionError = require('../Shared/Errors/RedisConnectionError').RedisConnectionError;

// ### Adapter class ###

function RedisAdapter() {
    this.client = redis.createClient();
    this.client.on('error', function (error) {
       throw new RedisConnectionError(error); 
    });
}

module.exports.RedisAdapter = RedisAdapter;