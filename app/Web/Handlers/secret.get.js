'use strict';

var getTemplate = require('../../Utils/getTemplate').getTemplate;

function secretGet(deps, params) {
    params.res.send(getTemplate('jade', __dirname + '/../Templates/secret.jade'));
}

module.exports.secretGet = secretGet;