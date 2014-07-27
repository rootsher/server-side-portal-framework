var redis = require('redis');

function RedisAdapter() {
	this.client = redis.createClient();
}

RedisAdapter.prototype.connect = function () {
	var self = this;

	return function (req, res, next) {
		self.client.on('error', function (error) {
			console.log('Error:', error);
		});
		next();
	};
};

module.exports.RedisAdapter = RedisAdapter;