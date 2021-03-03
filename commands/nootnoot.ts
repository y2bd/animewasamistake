import * as DJ from "discord.js";

export function nootnoot(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("noot noot") + 1) {
    msg.channel.send(msg.author, { files: ["http://i.imgur.com/8TX82VJ.jpg"] });
  }
}
