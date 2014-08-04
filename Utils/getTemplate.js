'use strict';

var jade = require('jade');

function getTemplate(type, path, options) {
    var html = '';

    if (type === 'jade') {
        html = jade.renderFile(path, options);
    }

    return html;
}

module.exports.getTemplate = getTemplate;