App.Collections.Lights = Backbone.Collection.extend({

	model: App.Models.Light,

	url: "http://81.65.193.159/api/eudG2UK2T1wbpQsZ28daEneJMN4d5t-Cgp7EGQX0/lights",

	parse: function(response, options) {
		var modelRawAttributes = _.values(response);
		var ids = _.keys(response);
		_.each(modelRawAttributes, function(value, key, list) {
			modelRawAttributes[key].id = ids[key];
		})
		return modelRawAttributes;
	}

});