App.Models.Light = Backbone.Model.extend({

	initialize: function() {
	    var vars = this.get("state");
        // vars.url = "http://81.65.193.159/api/eudG2UK2T1wbpQsZ28daEneJMN4d5t-Cgp7EGQX0/lights/" + this.id + "/state";
        vars.id = this.id;
        // console.log(vars);
		this.set({"state" : new App.Models.State(vars) });
	},

	url: function() {
		return "http://81.65.193.159/api/eudG2UK2T1wbpQsZ28daEneJMN4d5t-Cgp7EGQX0/lights/" + this.id ;
	},

	idAttribute: "id",

    turnOn: function () {
	    this.get("state").turnOn();
    },

    turnOff: function () {
        this.get("state").turnOff();
    }
});