var getTemplate = require('../../Utils/getTemplate').getTemplate;

function loginPost(deps, params) {
	var data = {
		login: params.req.body.login,
		password: params.req.body.password
	};

	params.res.send(getTemplate('jade', __dirname + '/../Templates/login.jade'));
}

module.exports.loginPost = loginPost;