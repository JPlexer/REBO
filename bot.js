const Discord = require('discord.js');
const client = new Discord.Client();
const func = require("./modules/functions.js")
const prefix = func.prefix;
const usef = require("./modules/useful.js")
const nousef = require("./modules/nouseful.js")
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
  const args2 = message.content.split(' ').slice(1).join(" ");

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

  } else if (lc.startsWith (`${prefix}eval`)) {
    evil(client, message,  args2);

} else if (lc.startsWith(`${prefix}play`)) {
  if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
    if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
      getID(args, id => {
        add_to_queue(id, message);
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
      getID(args, id => {
        guilds[message.guild.id].queue.push(id);
        playMusic(id, message);
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
} else if (lc.startsWith(`${prefix}skip`)) {
  if (!guilds[message.guild.id].skippers.includes(message.author.id)) {
    guilds[message.guild.id].skippers.push(message.author.id);
    guilds[message.guild.id].skipReq++;
    if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
      skip_song(message);
      message.reply(" your skip has been acknowledged. Skipping now");
    } else {
      message.reply(`${` your skip has been acknolwedged. You need **${Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)}` - skipReq}** more skip votes!`);
    }
  } else {
    message.reply(" you already voted to skip!");
  }
} else if (lc.startsWith(`${prefix}queue`)) {
  let message2 = "```";
  for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
    const temp = `${i + 1}: ${guilds[message.guild.id].queueNames[i]}${i === 0? "**(Current Song)***" : ""}\n`;
    if ((message2 + temp).length <= 2000 - 3) {
      message2 += temp;
    } else if (guilds[message.guild.id].queue.length === 0) {
      message.channel.send("There is Nothing in the Queue")
    } else {
      message2 += "```";
      message.channel.send(message2);
      message2 = "```";
    }
  }
  message2 += "```";
  message.channel.send(message2);

} else if (lc === `${prefix}stop`) {
  stop_song(message);
  message.reply('Stopped the Music')

} else if (lc.startsWith(`${prefix}clear`)) {
  guilds[message.guild.id].queue = [guilds[message.guild.id].queue.slice(0, 1)];
  guilds[message.guild.id].queueNames = [guilds[message.guild.id].queueNames.slice(0, 1)];
  message.reply("cleared the queue!");
}
});


function skip_song({
guild
}) {
guilds[guild.id].dispatcher.end();
}

function stop_song({
guild
}) {
guilds[guild.id].queue.length = 0;
guilds[guild.id].dispatcher.end();
}


function playMusic(id, message) {
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
}

function getID(str, cb, message) {
if (isYoutube(str)) {
  cb(getYouTubeID(str));
} else {
  search_video(str, id => {
    cb(id);
  });
}
}

function add_to_queue(strID, {
guild
}) {
if (isYoutube(strID)) {
  guilds[guild.id].queue.push(getYoutubeID(strID));
} else {
  guilds[guild.id].queue.push(strID);
}
}

function isYoutube(str) {
return str.toLowerCase().includes("youtube.com");
}

function search_video(query, callback) {
request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
  const json = JSON.parse(body);
  if (!json.items[0]) callback("3_-a9nVZYjk");
  else {
    callback(json.items[0].id.videoId);
  }
});
}
