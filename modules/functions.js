//functions.js
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const yt_api_key = process.env.YT_TOKEN;
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
  setGame: function (client) {
    client.user.setActivity(module.exports.getRandom(
      "with my Users",
      "Annoying JPlexer",
      `${module.exports.prefix}help`,
      `${module.exports.botver}`,
      `${module.exports.botver}`,
      `${module.exports.prefix}help`), {
      type: "PLAYING"
    });
  },
  prefix: "rebo_",
  botver: "v.1.0.0",
  branch: "REBO",
  skip_song: function (id, guilds, {
    guild
  }) {
    guilds[guild.id].dispatcher.end();
  },

  stop_song: function (id, guilds, {
    guild
  }) {
    guilds[guild.id].queue.length = 0;
    guilds[guild.id].dispatcher.end();
  },


  playMusic: function (id, message, guilds) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



    guilds[message.guild.id].voiceChannel.join().then(connection => {
      stream = ytdl(`https://www.youtube.com/watch?v=${id}`, );
      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];

      guilds[message.guild.id].dispatcher = connection.playStream(stream);
      guilds[message.guild.id].dispatcher.on('end', () => {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        guilds[message.guild.id].queue.shift();
        guilds[message.guild.id].queueNames.shift();
        if (guilds[message.guild.id].queue.length === 0) {
          guilds[message.guild.id].queue = [];
          guilds[message.guild.id].queueNames = [];
          guilds[message.guild.id].newsongs = [];
          guilds[message.guild.id].isPlaying = false;
          guilds[message.guild.id].voiceChannel.leave();
        } else {
          setTimeout(() => {
            playMusic(guilds[message.guild.id].queue[0], message);
          }, 500)
        }
      })
    });
  },

  getID: function (id, str, cb, message) {
    if (module.exports.isYoutube(str)) {
      cb(getYouTubeID(str));
    } else {
      module.exports.search_video(str, id => {
        cb(id);
      });
    }
  },

  add_to_queue: function (id, strID, guilds, {
    guild
  }) {
    if (module.exports.isYoutube(strID)) {
      guilds[guild.id].queue.push(getYoutubeID(strID));
    } else {
      guilds[guild.id].queue.push(strID);
    }
  },

  search_video: function (id, query, callback, guilds) {
    request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
      const json = JSON.parse(body);
      if (!json.items[0]) callback("3_-a9nVZYjk");
      else {
        callback(json.items[0].id.videoId);
      }
    });
  },
  isYoutube: function (str) {
    return str.toLowerCase().includes("youtube.com");
  },
  clean: function (text) {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  },
  args: function (message) {
    message.content.split(" ").slice(1);
  },
}