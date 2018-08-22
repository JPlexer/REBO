const ytdl = require("ytdl-core");
const func = require("./functions.js")
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const yt_api_key = process.env.YT_TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client();
const fetchVideoInfo = require("youtube-info");
module.exports = {
  play: function (id, message, guilds, args) {
    if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
      if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
        func.getID(id, str, cb, message, args, id => {
          func.add_to_queue(id, strID, guilds);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            message.reply(` added to queue: **${title}**`);
            guilds[message.guild.id].queueNames.push(title);
          });
        });
      } else {
        isPlaying = true;
        func.getID(args, id => {
          guilds[message.guild.id].queue.push(id);
          func.playMusic(id, message, guilds);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            guilds[message.guild.id].queueNames.push(title);

            message.reply(` now playing: **${title}**`);
          })
        });
      }
    } else {
      message.reply(" you need to be in a voice channel!");
    }
  },
  skip: function (id, message, guilds) {
    if (!guilds[message.guild.id].skippers.includes(message.author.id)) {
      guilds[message.guild.id].skippers.push(message.author.id);
      guilds[message.guild.id].skipReq++;
      if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
        func.skip_song(id, guilds);
        message.reply(" your skip has been acknowledged. Skipping now");
      } else {
        message.reply(`${` your skip has been acknolwedged. You need **${Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)}` - skipReq}** more skip votes!`);
      }
    } else {
      message.reply(" you already voted to skip!");
    }
  },
  queue: function (id, message, guilds) {
    let message2 = "```";
    for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
      const temp = `${i + 1}: ${guilds[message.guild.id].queueNames[i]}${i === 0? "**(Current Song)***" : ""}\n`;
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);
  },
  stop: function (id, message, guilds) {
    func.stop_song(id, guilds);
    message.reply('Stopped the Music')
  },
  clear: function (id, message, guilds) {
    guilds[message.guild.id].queue = [guilds[message.guild.id].queue.slice(0, 1)];
    guilds[message.guild.id].queueNames = [guilds[message.guild.id].queueNames.slice(0, 1)];
    message.reply("cleared the queue!");
  },
}