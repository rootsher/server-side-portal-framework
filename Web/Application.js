var express = require('express');
var app = express();

var CurrentUser = require('../Architecture/CurrentUser').CurrentUser;
var WebService = require('../Architecture/WebService').WebService;
var MongoAdapter = require('../Adapters/Mongo').MongoAdapter;
var RedisAdapter = require('../Adapters/Redis').RedisAdapter;

var webServiceInit = new WebService(new CurrentUser());
var runService = webServiceInit.runWrapper();

// Database adapters.
var mongodb = new MongoAdapter();
var redis = new RedisAdapter();

app.use(mongodb.connect());
app.use(redis.connect());

app.use(function (req, res, next) {
	// Add things to dependencies in everything service.
	webServiceInit.addDependency('mongo', mongodb);
	webServiceInit.addDependency('redis', redis);
	next();
});

app.use(function (req, res, next) {
	webServiceInit.runRef = webServiceInit.run.bind(webServiceInit);
	next();
});

app.use(express.static('Resources'));


// ### Routing ###

app.get('/login', runService('loginGet', [0, 1, 2, 3], { param1: 'value1', param2: 'value2' }));
app.get('/secret', runService('secretGet', [2, 3], { param1: 'value1', param2: 'value2' }));


app.listen(process.argv[2]);
console.log('Server listening on port ' + process.argv[2] + '.');