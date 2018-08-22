const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
const cleverbot = require("cleverbot.io");
const clbot = new cleverbot(process.env.CL_USER, process.env.CL_TOKEN);
module.exports = {
    ping: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Pong!`);
        embed.addField("Your ping is", ` \`${`${Date.now() - message.createdTimestamp}`} ms\``, true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
            embed
        });
        return true;
    },
    help: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`${functions.branch} Help`);
        embed.setDescription(`You can use this Commands with ${functions.branch}. Just type ${functions.prefix}[command]`);
        embed.addField("Fun & Play Commands", `ping\npong\npizza\nhelp\nPing ${functions.branch} at the beginning of a Message to chat with him`, true);
        embed.addField("Music Commands", "play\nskip\nstop\nclear\nqueue", true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
            embed
        });
        return true;
    },
    clev: function (message) {
        clbot.create((err, session) => {
            clbot.ask(message.content, (err, response) => {
                message.channel.send(response)
            });
        });
    },
    clstart: function () {
        clbot.setNick(`${functions.branch}`);
    },
    credits: function(message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setDescription(`Those People Helped Creating ${functions.branch}`);
        embed.addField("<:jplexer:481923432280358912>JPlexer", `Created ${functions.branch} and is Developing it!`, true);
        embed.addField("<:jyguy:481922951294353418>JYGUY", "Helped JPlexer often", true);
        embed.addField("<:root:481923832547115028>Root's Programming Club", `Provided the Codebase for ${functions.branch}'s Music Function`, true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
            embed
        });
        return true;
    },
    invite: function(message){
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setTitle("Invite here")
        embed.setURL("https://discordapp.com/oauth2/authorize?client_id=460487483600404492&scope=bot&permissions=1056768")
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
            embed
        });
        return true;
    },
}
