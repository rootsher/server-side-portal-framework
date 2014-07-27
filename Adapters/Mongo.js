var mongodb = require('mongodb');
var nodefn = require('when/node');
var util = require('util');


// ### Errors ###

function MongoConnectionError(error) {
	this.name = 'MongoConnectionError';
	this.message = error;
}
util.inherits(MongoConnectionError, Error);


function MongoAdapter() {
	this._connectURI = 'mongodb://0.0.0.0:27017/';
	this._databaseName = 'testowa';
	this.collections = {
		'users': undefined
	};
}

MongoAdapter.prototype.connect = function () {
	var self = this;

	return function (req, res, next) {
		var MongoClient = mongodb.MongoClient;
		var promisedConnect = nodefn.call(MongoClient.connect, self._connectURI + self._databaseName);

		promisedConnect.done(function (db) {
			for (var collection in self.collections) {
				self.collections[collection] = db.collection(collection);
			}
			next();
		}, function (error) {
			throw new MongoConnectionError(error);
		});
	};
};

module.exports.MongoAdapter = MongoAdapter;