//functions.js
const Discord = require('discord.js');
const client = new Discord.Client();
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
    prefix: "rebo_",
    botver: "v.1.0.0",
    branch: "REBO",
}