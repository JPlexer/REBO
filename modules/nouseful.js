const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
module.exports = {
    pong: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Ping!`);
        embed.addField("Your pong is",` \`${`${message.createdTimestamp - Date.now()}`} ms\``, true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
            embed
        });
        return true;
    },
    pizza: function (message) {
        message.channel.send('Here is your Pizza! :pizza:')
    },
    lol: function (message) {
        message.channel.send(':scream: You found the Secret :scream:');
    },
}