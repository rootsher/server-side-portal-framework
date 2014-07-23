var express = require('express');
var app = express();

app.use(express.static('Resources'));

function CurrentUser() {
    // 0 - guest, 1 - user, 2 - admin, 3 - root
    this._typeAccount = 0; // default 0
}

CurrentUser.prototype.getTypeAccount = function () {
    return this._typeAccount;
};


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

function serviceLayer() {}

var currentUser = new CurrentUser();

function webService(name, allowedTypeAccount, params) {
    var permissionsInit = new PermissionConstructor(allowedTypeAccount, currentUser);
    var dependencies = {
        mongo: 'mongo',
        redis: 'redis'
    };

    return function (req, res) {
        var webServices;

        params.req = req;
        params.res = res;
        webServices = require('../ServiceDirectories/Web/Public');

        if (permissionsInit.check()) {
            webServices[name].call(undefined, dependencies, params);
        } else {
            webServices['accessDenied'].call(undefined, dependencies, params);
        }
    };
}

// ### Routing ###

app.get('/login', webService('loginGet', [0, 1], { param1: 'value1', param2: 'value2' }));

app.listen(4444);
console.log('Server listening on port 4444.');