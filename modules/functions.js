//functions.js
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const yt_api_key = process.env.YT_TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client();
const guilds = {};
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
    prefix: "rebo_",
    botver: "v.1.0.0",
    branch: "REBO",
    skip_song: function ({
        guild
      }) {
        guilds[guild.id].dispatcher.end();
      },
      
      stop_song: function({
        guild
      }) {
        guilds[guild.id].queue.length = 0;
        guilds[guild.id].dispatcher.end();
      },
      
      
      playMusic: function (id, message) {
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
      
      getID: function(str, cb, message) {
        if (isYoutube(str)) {
          cb(getYouTubeID(str));
        } else {
          search_video(str, id => {
            cb(id);
          });
        }
      },
      
      add_to_queue: function (strID, {
        guild
      }) {
        if (isYoutube(strID)) {
          guilds[guild.id].queue.push(getYoutubeID(strID));
        } else {
          guilds[guild.id].queue.push(strID);
        }
      },
      
      isYoutube: function (str) {
        return str.toLowerCase().includes("youtube.com");
      },
      
      search_video: function (query, callback) {
        request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
          const json = JSON.parse(body);
          if (!json.items[0]) callback("3_-a9nVZYjk");
          else {
            callback(json.items[0].id.videoId);
          }
        });
      },
}