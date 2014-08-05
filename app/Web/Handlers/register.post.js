'use strict';

var getTemplate = require('../../Utils/getTemplate').getTemplate;
var SystemNotification = require('../../Shared/Types/SystemNotification').SystemNotification;
var when = require('when');
var nodefn = require('when/node');


function registerPost(deps, params) {
    var data = {
        email: params.req.body.email,
        login: params.req.body.login,
        password: params.req.body.password,
        repeatPassword: params.req.body.repeatPassword
    };
    var usersCollection = deps.mongo.collections.users;
    var promisedFind = nodefn.call(usersCollection.find({
        $or: [
            { login: data.login },
            { email: data.email }
        ]
    }).count);

    return promisedFind.then(function (result) {
        if (result > 0) {
            return when.reject(new SystemNotification('error', 'User exists.'));
        }

        if (data.password !== data.repeatPassword) {
            return when.reject(new SystemNotification('error', 'Passwords is not equal.'));
        }

        var documentData = {};

        Object.keys(data).forEach(function (field) {
            if (field !== 'repeatPassword') {
                documentData[field] = data[field];
            }
        });

        documentData.accountType = 1;

        var promisedInsert = nodefn.call(usersCollection.insert.bind(usersCollection, documentData));
        return promisedInsert.then(function (insertData) {
            return when.resolve(new SystemNotification('notification', 'User created.'));
        }).catch(function (error) {
            return when.reject(new SystemNotification('error', error));
        });
    }).catch(function (rejectMessage) {
        return when.resolve(rejectMessage);
    }).then(function (message) {
        params.res.send(getTemplate('jade', __dirname + '/../Templates/register.jade', { content: message.content }));
        return when.resolve(true);
    });
}

module.exports.registerPost = registerPost;