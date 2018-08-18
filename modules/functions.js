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
    setGame: client.on('ready', () => {
        client.user.setActivity(getRandom(
            "with my Users",
            "Annoying JPlexer",
            `${prefix}help`,
            `${botver}`,
            `${botver}`,
            `${prefix}help`), {
            type: "PLAYING"
        });
    }),
}
