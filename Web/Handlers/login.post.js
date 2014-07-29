var getTemplate = require('../../Utils/getTemplate').getTemplate;

function loginPost(deps, params) {
	console.log('Form:', params.req.body);
	params.res.send(getTemplate('jade', __dirname + '/../Templates/login.jade'));
}

module.exports.loginPost = loginPost;