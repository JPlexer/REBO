//functions.js
module.exports = {
    description: "Functions for Basic Commands",
    getRandom: function () {
        if (arguments.length == 1) {
            if (typeof arguments[0] == Array) {
                var random = Math.floor(Math.random() * 1000) % arguments[0].length;
                return arguments[0][random];
            }
        } else {
            var random = Math.floor(Math.random() * 1000) % arguments.length;
            return arguments[random];
        }
    },
}