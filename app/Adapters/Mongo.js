'use strict';

var mongodb = require('mongodb');
var nodefn = require('when/node');
var MongoConnectionError = require('../Shared/Errors/MongoConnectionError').MongoConnectionError;

function MongoAdapter() {
    this._connectURI = 'mongodb://0.0.0.0:27017/';
    this._databaseName = 'testowa';
    this.collections = {
        'users': undefined
    };
}

MongoAdapter.prototype.connect = function () {
    var self = this;

    var MongoClient = mongodb.MongoClient;
    var promisedConnect = nodefn.call(MongoClient.connect, this._connectURI + this._databaseName);

    return promisedConnect.then(function (db) {
        Object.keys(self.collections).forEach(function (collectionName) {
            self.collections[collectionName] = db.collection(collectionName);
        });
        return self;
    }).catch(function (error) {
        throw new MongoConnectionError(error);
    });
};

module.exports.MongoAdapter = MongoAdapter;