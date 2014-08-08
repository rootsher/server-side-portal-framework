'use strict';

function Route(method, path, service, permissions, params) {
    this.method = method;
    this.path = path;
    this.service = service;
    this.permissions = permissions;
    this.params = params || {};
}

function Router() {
    this._routes = [];
}

Router.prototype.add = function add(method, path, service, permissions, params) {
    this._routes.push(new Route(method, path, service, permissions, params));
};

Router.prototype.get = function get() {
    return this._routes;
};

module.exports.Router = Router;