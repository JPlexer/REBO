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
}