var getTemplate = require('../../Utils/getTemplate').getTemplate;

function accessDenied(deps, params) {
	params.res.send(getTemplate('jade', __dirname + '/../Templates/accessDenied.jade'));
}

module.exports.accessDenied = accessDenied;