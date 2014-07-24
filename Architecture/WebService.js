var PermissionConstructor = require('./PermissionConstructor').PermissionConstructor;

function WebService(currentUser, dependencies) {
	this.currentUser = currentUser;
	this.dependencies = dependencies;
}

WebService.prototype.run = function (name, allowedTypeAccount, params) {
	var self = this;
	var permissionsInit = new PermissionConstructor(allowedTypeAccount, this.currentUser);

	return function (req, res) {
		var webServices;

		params.req = req;
		params.res = res;
		webServices = require('../ServiceDirectories/Web/Public');

		if (permissionsInit.check()) {
			webServices[name].call(undefined, self.dependencies, params);
		} else {
			webServices['accessDenied'].call(undefined, self.dependencies, params);
		}
	};
};

module.exports.WebService = WebService;