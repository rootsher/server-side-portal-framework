var redis = require('redis');
var util = require('util');


// ### Errors ###

function RedisConnectionError(error) {
	this.name = 'RedisConnectionError';
	this.message = error;
}
util.inherits(RedisConnectionError, Error);


function RedisAdapter() {
	this.client = redis.createClient();
}

RedisAdapter.prototype.connect = function () {
	var self = this;

	return function (req, res, next) {
		self.client.on('error', function (error) {
			throw new RedisConnectionError(error);
		});
		next();
	};
};

module.exports.RedisAdapter = RedisAdapter;