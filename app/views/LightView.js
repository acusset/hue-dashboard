App.Views.Light = Backbone.View.extend({

    el: "div#content",

    template: _.template($("#light-template").html()),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    events: {
        "click .on" : "turnOn",
        "click .off" : "turnOff",
        "click .switch-color": "switchColor"
    },

    turnOn: function () {
        this.model.turn("on");
    },

    turnOff: function () {
        this.model.turn("off");
    },

    switchColor: function(ev) {
        var colors = $(ev.currentTarget).data("rgb").split(",");
        this.model.switchColor(colors[0],colors[1],colors[2]);
    }
});