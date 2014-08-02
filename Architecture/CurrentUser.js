var when = require('when');
var nodefn = require('when/node');
var mongodb = require('mongodb');
var BSON = mongodb.BSONPure;

function CurrentUser() {
	// 0 - guest, 1 - user, 2 - admin, 3 - root
	this._typeAccount = 0; // default 0
}

CurrentUser.prototype.getTypeAccount = function () {
	return this._typeAccount;
};

CurrentUser.prototype.setTypeAccount = function (typeID) {
	this._typeAccount = typeID;
};

CurrentUser.prototype.checkCookie = function (mongo, redis) {
	var self = this;

	return function (req, res, next) {
		var sessionID = req.cookies.sessionID;

		redis.client.get('sessionID:' + sessionID, function (error, userID) {
			if (error) {
				throw Error('Error while getting key from redis.');
			}
			var usersCollection = mongo.collections.users;
			if (userID === null) {
				self.setTypeAccount(0);
			}
			var promisedFind = nodefn.call(usersCollection.find({
				_id: new BSON.ObjectID(userID)
			}).toArray);

			return promisedFind.then(function (userData) {
				if (userData.length === 0) {
					return when.reject('Invalid userID.');
				}
				self.setTypeAccount(userData[0].accountType || 0);
				return when.resolve();
			}).catch(function (content) {
				throw new Error(content);
			}).finally(function () {
				next();
			});
		});
	};
};

module.exports.CurrentUser = CurrentUser;