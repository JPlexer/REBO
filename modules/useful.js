const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
module.exports = {
    setGame: function () {
        client.on('ready', () => {
            client.user.setActivity(functions.getRandom(
                "with my Users",
                "Annoying JPlexer",
                `${prefix}help`,
                `${botver}`,
                `${botver}`,
                `${prefix}help`), {
                type: "PLAYING"
            });
            console.log(client.user.presence.game.name);
        })
    }
}