var mongodb = require('mongodb');
var nodefn = require('when/node');

function MongoAdapter() {
	this.connectURI = 'mongodb://0.0.0.0:27017/';
	this.databaseName = 'testowa';
	this.collections = {
		'users': undefined
	};
}

MongoAdapter.prototype.connect = function () {
	var self = this;

	return function (req, res, next) {
		var MongoClient = mongodb.MongoClient;
		var promisedConnect = nodefn.call(MongoClient.connect, self.connectURI + self.databaseName);

		promisedConnect.done(function (db) {
			for (var collection in self.collections) {
				self.collections[collection] = db.collection(collection);
			}
			next();
		}, function (error) {
			console.log('!!', error);
			next();
		});
	};
};

module.exports.MongoAdapter = MongoAdapter;