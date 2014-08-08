'use strict';

var getTemplate = require('../../Utils/getTemplate').getTemplate;

function indexGet(deps, params) {
    params.res.send(getTemplate('jade', __dirname + '/../Templates/index.jade'));
}

module.exports.indexGet = indexGet;