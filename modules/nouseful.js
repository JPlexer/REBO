const func = require("./functions.js")
const Discord = require('discord.js');
const client = new Discord.Client();
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
}