function PermissionConstructor(allowedTypeAccount, user) {
    this._currentUser = user;
    this._allowedTypeAccount = allowedTypeAccount;
}

PermissionConstructor.prototype.check = function () {
    var self = this;

    if (this._allowedTypeAccount.some(function (type) {
        return type === self._currentUser.getTypeAccount();
    })) {
        return true;
    } else {
        return false;
    }
};

module.exports.PermissionConstructor = PermissionConstructor;