'use strict';

function PermissionConstructor(allowedTypeAccount, user) {
    this._currentUser = user;
    this._allowedTypeAccount = allowedTypeAccount;
}

PermissionConstructor.prototype.check = function () {
    var self = this;

    return !!this._allowedTypeAccount.some(function (type) {
        return type === self._currentUser.getTypeAccount();
    });
};

module.exports.PermissionConstructor = PermissionConstructor;