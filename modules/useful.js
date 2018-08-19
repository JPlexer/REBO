const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
module.exports = {
    setGame: function (client) {
        client.user.setActivity(functions.getRandom(
            "with my Users",
            "Annoying JPlexer",
            `${functions.prefix}help`,
            `${functions.botver}`,
            `${functions.botver}`,
            `${functions.prefix}help`), {
            type: "PLAYING"
        });
    },
    ping:function ('message', message){ 
        message.channel.send(`:ping_pong:Pong! Your ping is \`${`${Date.now() - message.createdTimestamp}`} ms\``);
},
}
