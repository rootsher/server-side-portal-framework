'use strict';

var Router = require('../Architecture/Router').Router;
var routerInit = new Router();

// ### Routes ###

routerInit.add('get', '/', 'indexGet', [0, 1, 2, 3]);

routerInit.add('get', '/login', 'loginGet', [0, 1, 2, 3]);
routerInit.add('post', '/login', 'loginPost', [0, 1, 2, 3]);

routerInit.add('get', '/register', 'registerGet', [0, 1, 2, 3]);
routerInit.add('post', '/register', 'registerPost', [0, 1, 2, 3]);

routerInit.add('get', '/secret', 'secretGet', [1, 2, 3], { param1: 'value1', param2: 'value2' });

module.exports.Routing = {
    get: routerInit.get.bind(routerInit)
};