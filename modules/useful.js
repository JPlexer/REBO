const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./modules/functions.js")
module.exports = {
    setGame: function () {
        client.user.setActivity(functions.getRandom(
            "with my Users",
            "Annoying JPlexer",
            `${prefix}help`,
            `${botver}`,
            `${botver}`,
            `${prefix}help`), {
            type: "PLAYING"
        });
    }
}
