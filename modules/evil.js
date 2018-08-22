const Discord = require("discord.js");

module.exports = function(client,message,args2) {
    if (message.member !== 348065394520621067)return message.channel.send("**Hey, `" + message.author.username + "` You Can't use eval only JPlexer can!**");

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

    try{
      const code = args2.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string"){
        evaled = require("util").inspect(evaled);
      }

    if (evaled.includes(client.token)){
        evaled = evaled.replace(client.token, "THATS MY PRIVESSEESEES NO! AND I MEAN NO! \n\ YOU GET I WILL CALL THE COPS 👮");

        if (evaled.includes(client.token)){
            evaled = evaled.replace(client.token, "THATS MY PRIVESSEESEES NO! AND I MEAN NO! \n\ YOU GET I WILL CALL THE COPS 👮");
        }   
    }

    let embed = new Discord.RichEmbed()
    .addField(`Input`, "***```" + code + "```***", true)
    .addField(`Output`, `\`\`\`python\n${evaled}\`\`\``,)
    .setColor("#cb36ed")//
    .setTimestamp()



message.channel.send(embed).then(msg => {msg.delete(25000)});

    } catch (err) {
    message.channel.send('``Error``\n ```'+ clean(err) +'```').then(msg => {msg.delete(25000)});
    }    
}
