const Discord = require('discord.js');
const client = new Discord.Client();
const func = require("./functions.js")
module.exports = {
    pong: function (message) {
        message.channel.send(`:ping_pong:Ping! Your pong is \`${`${message.createdTimestamp - Date.now()}`} ms\``);
    },
    pizza: function (message) {
        message.channel.send('Here is your Pizza! :pizza:')
    },
    lol: function (message) {
        message.channel.send(':scream: You found the Secret :scream:');
    },
    setGame: function (client) {
        client.user.setActivity(func.getRandom(
          "with my Users",
          "Annoying JPlexer",
          `${func.prefix}help`,
          `${func.botver}`,
          `${func.botver}`,
          `${func.prefix}help`), {
          type: "PLAYING"
        });
      },
}