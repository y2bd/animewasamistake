import * as DJ from "discord.js";

export function pressXToJson(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().match(/.*j+a+s+o+n+!+.*/)) {
    msg.react("🎈");
    msg.channel.send(msg.author, {
      reply: msg.author,
      files: ["https://i.imgur.com/umeW9Sb.png"],
    });
  }
}
