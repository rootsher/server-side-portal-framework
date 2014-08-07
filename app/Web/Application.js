'use strict';

var compositor = require('app-compositor');
var manager = new compositor.CompositionManager();

function mongodb() {
    this.is('mongodb');
    this.provides('mongodb', function (dependencies) {
        var MongoAdapter = require('../Adapters/Mongo').MongoAdapter;
        var mongodb = new MongoAdapter();

        return mongodb.connect();
    });
}

function redis() {
    this.is('redis');
    this.provides('redis', function (dependencies) {
        var RedisAdapter = require('../Adapters/Redis').RedisAdapter;
        var redis = new RedisAdapter();

        return redis;
    });
}

function app() {
    this.is('app');
    this.requires('mongodb');
    this.requires('redis');
    this.provides('app', function (dependencies) {
        var express = require('express');
        var bodyParser = require('body-parser');
        var cookieParser = require('cookie-parser');
        var app = express();
        var CurrentUser = require('../Architecture/CurrentUser').CurrentUser;
        var WebService = require('../Architecture/WebService').WebService;

        var requestContext = new CurrentUser();
        var webServiceInit = new WebService(requestContext);
        var runService = webServiceInit.runWrapper();

        app.use(cookieParser());

        app.use(requestContext.checkCookie(dependencies.mongodb, dependencies.redis));

        app.use(function (req, res, next) {
            // Add things to dependencies in everything service.
            webServiceInit.addDependency('mongo', dependencies.mongodb);
            webServiceInit.addDependency('redis', dependencies.redis);
            webServiceInit.addDependency('requestContext', requestContext);
            next();
        });

        app.use(function (req, res, next) {
            webServiceInit.runRef = webServiceInit.run.bind(webServiceInit);
            next();
        });

        app.use(express.static('Resources'));
        app.use(bodyParser.urlencoded({ extended: false }));

        var Routing = require('../System/Routing').Routing;

        Routing.get().forEach(function (route) {
            app[route.method](route.path, runService(route.service, route.permissions, route.params));
        });

        app.listen(process.argv[2]);
    });
}

manager.runModules([mongodb, redis, app]).done(function applicationCompositionFinished(results) {
    console.log('** Composition finished! The application is now running.');
    console.log('** Server listening on port ' + process.argv[2] + '.');
}, function handleCompositionError(error) {
    console.error('!! Composition error:', error);
});