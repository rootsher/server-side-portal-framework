'use strict';

var when = require('when');
var nodefn = require('when/node');
var mongodb = require('mongodb');
var BSON = mongodb.BSONPure;


var ACCOUNT_TYPES = {
    GUEST: 0,
    USER: 1,
    ADMIN: 2,
    ROOT: 3
};

function CurrentUser() {
    this.account = {
        accountType: ACCOUNT_TYPES.GUEST,
        email: undefined
    };
}

CurrentUser.prototype.checkCookie = function (mongo, redis) {
    var self = this;

    return function (req, res, next) {
        var sessionID = req.cookies.sessionID;

        redis.client.get('sessionID:' + sessionID, function (error, userID) {
            if (error) {
                throw new Error('Error while getting key from redis.');
            }
            var usersCollection = mongo.collections.users;
            if (userID === null) {
                self.account.accountType = ACCOUNT_TYPES.GUEST;
            }
            var promisedFind = nodefn.call(usersCollection.find({
                _id: new BSON.ObjectID(userID)
            }).toArray);

            return promisedFind.then(function (userData) {
                if (userData.length === 0) {
                    return when.reject('Invalid userID.');
                }
                self.account = userData[0] || self.account;
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