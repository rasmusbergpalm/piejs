/**
 * Creates a controller in which a users controller will inherit from.
 *
 * Controller will load the model (and related models), and provide the model's
 * standard methods to find and save data in a data source agnostic way.
 *
 * @param string name Name of the model (ie: Post, Tag, User)
 *
 * 2011-05-17 23.16.13 - Justin Morris
 */
function Controller(name) {
	this.name       = name;
	var model       = require(config.paths.app.models + this.name.toLowerCase())[this.name];
	this[this.name] = new Model(model);

	if (typeof model.belongsTo != 'undefined' && model.belongsTo) {
		for (var i in model.belongsTo) {
			var belongsToModel = require(config.paths.app.models + i.toLowerCase())[i];
			this[this.name][i] = new Model(belongsToModel);
		}
	}

	if (typeof model.hasMany != 'undefined' && model.hasMany) {
		for (var i in model.hasMany) {
			var belongsToModel = require(config.paths.app.models + i.toLowerCase())[i];
			this[this.name][i] = new Model(belongsToModel);
		}
	}
}

/**
 * Sets the variables to the view, and renders the view for the requester.
 *
 * @param Object request Request object from express
 * @param Object response Response object from express
 * @param Object results Data to send to the view
 *
 * 2011-05-17 23.20.50 - Justin Morris
 */
Controller.prototype.set = function(request, response, results) {
	var	params     = request.params,
		controller = params.controller,
		action     = params.action;

	results.flash = request.flash();

	var responseParams = {
		'layout' : config.paths.app.views.layouts + 'default.jade',
		'locals' : results
	};

	response.render(controller + '/' + action, responseParams);
}
exports.Controller = Controller;