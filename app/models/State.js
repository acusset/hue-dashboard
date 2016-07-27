App.Models.State = Backbone.Model.extend({

    initialize: function() {
        console.log(this);
    },

    url: function() {
        return "http://81.65.193.159/api/eudG2UK2T1wbpQsZ28daEneJMN4d5t-Cgp7EGQX0/lights/" + this.id + "/state";
    },

    turnOn: function() {
        this.save({on: true});
    },

    turnOff: function() {
        this.save({on: false});
    }
});