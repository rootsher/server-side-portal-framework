var getTemplate = require('../../Utils/getTemplate').getTemplate;
var nodefn = require('when/node');
var util = require('util');


// ### Helpers ###

function SystemMessage(content) {
	this.content = content;
}


// ### Errors ###

function MongoFindUserError(error) {
	this.name = 'MongoFindUserError';
	this.message = error;
}
util.inherits(MongoFindUserError, Error);

function MongoInsertUserError(error) {
	this.name = 'MongoInsertUserError';
	this.message = error;
}
util.inherits(MongoInsertUserError, Error);


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
			return new SystemMessage('User exists.');
		}

		if (data.password !== data.repeatPassword) {
			return new SystemMessage('Passwords is not equal.');
		}

		var documentData = {};
		for (var field in data) {
			if (field !== 'repeatPassword') {
				documentData[field] = data[field];
			}
		}

		var promisedInsert = nodefn.call(usersCollection.insert.bind(usersCollection, documentData));
		return promisedInsert.then(function (insertData) {
			return new SystemMessage('User created.');
		}).catch(function (error) {
			throw new MongoInsertUserError(error);
		});
	}).then(function (message) {
		params.res.send(getTemplate('jade', __dirname + '/../Templates/register.jade', { content: message.content }));
	}).catch(function (error) {
		throw new MongoFindUserError(error);
	});
}

module.exports.registerPost = registerPost;