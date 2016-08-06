App.Models.Light = Backbone.Model.extend({

	initialize: function() {
	    var vars = this.get("state");
        vars.id = this.id;
		this.set({"state" : new App.Models.State(vars) });
	},

	url: function() {
		return "http://81.65.193.159/api/eudG2UK2T1wbpQsZ28daEneJMN4d5t-Cgp7EGQX0/lights/" + this.id ;
	},

	idAttribute: "id",

    turn: function (action) {
	    this.get("state").turn(action);
    },

	switchColor: function(r,g,b) {
		this.get("state").switchColor(r,g,b);
	}
});