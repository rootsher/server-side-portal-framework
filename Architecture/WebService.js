var PermissionConstructor = require('./PermissionConstructor').PermissionConstructor;

function WebService(currentUser) {
	this._currentUser = currentUser;
	this._dependencies = {};
	this.runRef = undefined;
}

WebService.prototype.runWrapper = function () {
	var self = this;

	return function (name, allowedTypeAccount, params) {
		name = name || 'accessDenied';
		allowedTypeAccount = allowedTypeAccount || [];
		params = params || {};

		return function (req, res) {
			params.req = req;
			params.res = res;
			self.runRef(name, allowedTypeAccount, params);
		};
	};
};

WebService.prototype.run = function (name, allowedTypeAccount, params) {
	allowedTypeAccount = allowedTypeAccount || [];
	params = params || {};

	var self = this;
	var permissionsInit = new PermissionConstructor(allowedTypeAccount, this._currentUser);
	var webServices = require('../ServiceDirectories/Web/Public');

	if (permissionsInit.check()) {
		webServices[name].call(undefined, self._dependencies, params);
	} else {
		webServices['accessDenied'].call(undefined, self._dependencies, params);
	}
};

WebService.prototype.addDependency = function (name, value) {
	this._dependencies[name] = value;
};

module.exports.WebService = WebService;