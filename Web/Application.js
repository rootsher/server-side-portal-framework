var express = require('express');
var app = express();

var CurrentUser = require('../Architecture/CurrentUser').CurrentUser;
var WebService = require('../Architecture/WebService').WebService;
var MongoAdapter = require('../Adapters/Mongo').MongoAdapter;
var RedisAdapter = require('../Adapters/Redis').RedisAdapter;

var mongodb = new MongoAdapter();
var redis = new RedisAdapter();

var webServiceRun;

var runService = function (name, allowedTypeAccount, params) {
	return function (req, res) {
		params.req = req;
		params.res = res;
		webServiceRun(name, allowedTypeAccount, params);
	};
};

app.use(mongodb.connect());
app.use(redis.connect());

app.use(function (req, res, next) {
	var webServiceInit = new WebService(new CurrentUser());

	webServiceInit.addDependency('mongo', mongodb);
	webServiceInit.addDependency('redis', redis);
	webServiceRun = webServiceInit.run.bind(webServiceInit);
	next();
});

app.use(express.static('Resources'));


// ### Routing ###

app.get('/login', runService('loginGet', [0, 1, 2, 3], { param1: 'value1', param2: 'value2' }));
app.get('/secret', runService('secretGet', [2, 3], { param1: 'value1', param2: 'value2' }));

app.listen(4444);
console.log('Server listening on port 4444.');