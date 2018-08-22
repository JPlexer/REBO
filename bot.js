const Discord = require('discord.js');
const client = new Discord.Client();
const func = require("./modules/functions.js")
const prefix = func.prefix;
const usef = require("./modules/useful.js")
const nousef = require("./modules/nouseful.js")
const music = require("./modules/music.js")
const evil = require("./modules/evil.js")
const setGamef = func.setGame
const guilds = {};

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('Ready!')
  client.setInterval(setGamef, 30000, client);
  setGamef(client);
  usef.clstart();
});

client.on('message', message => {
  const lc = message.content.toLowerCase();
  const args = message.content.split(' ').slice(1).join(" ");

  if (!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
      queue: [],
      queueNames: [],
      isPlaying: false,
      dispatcher: null,
      voiceChannel: null,
      skipReq: 0,
      skippers: []
    };
  }

  if (lc === `${prefix}ping`) {
    usef.ping(message);

  } else if (lc === `${prefix}pong`) {
    nousef.pong(message);

  } else if (lc === `${prefix}help`) {
    usef.help(message);

  } else if (lc === `${prefix}pizza`) {
    nousef.pizza(message);

  } else if (message.isMentioned(client.user)) {
    usef.clev(message);

  } else if (lc === `${prefix}lol`) {
    nousef.lol(message);

  } else if (lc.startsWith === `${prefix}eval`) {
    evil.eval(message);

  } else if (lc.startsWith(`${prefix}play`)) {
    music.play(message, guilds, args);

  } else if (lc.startsWith(`${prefix}skip`)) {
    music.skip(message, guilds);

  } else if (lc.startsWith(`${prefix}queue`)) {
    music.queue(message, guilds);

  } else if (lc === `${prefix}stop`) {
    music.stop(message, guilds);

  } else if (lc.startsWith(`${prefix}clear`)) {
    music.clear(message, guilds);
  }
});