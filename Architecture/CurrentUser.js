function CurrentUser() {
    // 0 - guest, 1 - user, 2 - admin, 3 - root
    this._typeAccount = 0; // default 0
}

CurrentUser.prototype.getTypeAccount = function () {
    return this._typeAccount;
};

module.exports.CurrentUser = CurrentUser;