App.Models.State = Backbone.Model.extend({

    initialize: function () {
        this.set("rgb", this.toRGB(this.get("xy")[0], this.get("xy")[1], this.get("bri")));
    },

    url: function () {
        return "http://81.65.193.159/api/eudG2UK2T1wbpQsZ28daEneJMN4d5t-Cgp7EGQX0/lights/" + this.id + "/state";
    },

    turn: function (action) {
        this.save({on: action == "on"}, {
            success: function (model, response, options) {
                _.each(response, function(value, key, list) {
                    model.unset(key);
                });
                Materialize.toast("Envoyé",3000);
            }
        });
    },

    switchColor: function (r,g,b) {
        var XY = this.toXY(r,g,b);
        console.log(XY);
        this.save({xy: XY}, {
            success: function (model, response, options) {
                _.each(response, function(value, key, list) {
                    model.unset(key);
                });
                Materialize.toast("Envoyé",3000);
            }
        });
    },

    toXY: function (red,green,blue){
        //Gamma correctie
        red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
        green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
        blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

        //Apply wide gamut conversion D65
        var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;                    

        var fx = X / (X + Y + Z);
        var fy = Y / (X + Y + Z);
        fx  = _.isNaN(fx) ? 0.0 : fx;
        fy  = _.isNaN(fy) ? 0.0 : fy;                    
        return [parseFloat(fx.toPrecision(4)),parseFloat(fy.toPrecision(4))];
    },

    toRGB: function (x, y, bri) {
        var z = 1.0 - x - y;
        var Y = bri / 255.0; // Brightness of lamp
        var X = (Y / y) * x;
        var Z = (Y / y) * z;
        var r = X * 1.612 - Y * 0.203 - Z * 0.302;
        var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
        var b = X * 0.026 - Y * 0.072 + Z * 0.962;
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        maxValue = Math.max(r,g,b);
        r /= maxValue;
        g /= maxValue;
        b /= maxValue;
        r = r * 255;   if (r < 0) { r = 255 };
        g = g * 255;   if (g < 0) { g = 255 };
        b = b * 255;   if (b < 0) { b = 255 };
        return [Math.round(r),Math.round(g),Math.round(b)];
    }
});