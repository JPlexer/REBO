module.exports = {
    clean: function(){ text => {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
      },
    eval: function(message) {
        const args = message.content.split(" ").slice(1);
        ​
            if(message.author.id !== 348065394520621067) return;
            try {
              const code = args.join(" ");
              let evaled = eval(code);
        ​
              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
        ​
              message.channel.send(this.clean(evaled), {code:"xl"});
            } catch (err) {
              message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
            }
},
}