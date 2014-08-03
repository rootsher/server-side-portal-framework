'use strict';

var getTemplate = require('../../Utils/getTemplate').getTemplate;

function loginGet(deps, params) {
    params.res.send(getTemplate('jade', __dirname + '/../Templates/login.jade'));
}

module.exports.loginGet = loginGet;