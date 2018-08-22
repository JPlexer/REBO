const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
const cleverbot = require("cleverbot.io");
const clbot = new cleverbot(process.env.CL_USER, process.env.CL_TOKEN);
module.exports = {
    ping: function (message) {
        message.channel.send(`:ping_pong:Pong! Your ping is \`${`${Date.now() - message.createdTimestamp}`} ms\``);
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
    eval: function (message) {
        if (message.author.id !== 348065394520621067) return;
        try {
            const code = func.args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
}