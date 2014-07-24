var express = require('express');
var app = express();

var CurrentUser = require('../Architecture/CurrentUser').CurrentUser;
var WebService = require('../Architecture/WebService').WebService;

app.use(express.static('Resources'));

var dependencies = {
	mongo: 'mongo',
	redis: 'redis'
};

var webServiceInit = new WebService(new CurrentUser(), dependencies);

var runService = webServiceInit.run.bind(webServiceInit);


// ### Routing ###

app.get('/login', runService('loginGet', [0, 1, 2, 3], { param1: 'value1', param2: 'value2' }));
app.get('/secret', runService('secretGet', [2, 3], { param1: 'value1', param2: 'value2' }));

app.listen(4444);
console.log('Server listening on port 4444.');