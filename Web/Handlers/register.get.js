var getTemplate = require('../../Utils/getTemplate').getTemplate;

function registerGet(deps, params) {
	params.res.send(getTemplate('jade', __dirname + '/../Templates/register.jade'));
}

module.exports.registerGet = registerGet;