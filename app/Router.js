App.Router = Backbone.Router.extend({

	routes: {
		"*action" : "defaultRoute",
		"test": "defaultRoute"
	},

	defaultRoute: function(action) {
		var lights = new App.Collections.Lights()
		lights.fetch({
			success: function () {
				var light = lights.get(1);
				light.turnOff();
			}
		});
	}
});