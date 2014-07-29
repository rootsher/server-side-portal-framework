var getTemplate = require('../../Utils/getTemplate').getTemplate;
var SystemMessage = require('../../Shared/Types/SystemMessage').SystemMessage;
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
			return when.reject(new SystemMessage('User exists.'));
		}

		if (data.password !== data.repeatPassword) {
			return when.reject(new SystemMessage('Passwords is not equal.'));
		}

		var documentData = {};
		for (var field in data) {
			if (field !== 'repeatPassword') {
				documentData[field] = data[field];
			}
		}

		var promisedInsert = nodefn.call(usersCollection.insert.bind(usersCollection, documentData));
		return promisedInsert.then(function (insertData) {
			return when.resolve(new SystemMessage('User created.'));
		}).catch(function (error) {
			return when.reject(new SystemMessage(error));
		});
	}).then(function (resolveMessage) {
		return resolveMessage;
	}).catch(function (rejectMessage) {
		return rejectMessage;
	}).then(function (message) {
		params.res.send(getTemplate('jade', __dirname + '/../Templates/register.jade', { content: message.content }));
		return when.resolve(true);
	});
}

module.exports.registerPost = registerPost;