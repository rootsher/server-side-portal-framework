var getTemplate = require('../../Utils/getTemplate').getTemplate;

function registerPost(deps, params) {
	console.log('Form:', params.req.body);
	params.res.send(getTemplate('jade', __dirname + '/../Templates/register.jade'));
}

module.exports.registerPost = registerPost;