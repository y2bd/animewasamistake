import * as DJ from "discord.js";

export function losangeles(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("/losangeles") >= 0) {
    msg.channel.send(msg.author, { files: ["http://i.imgur.com/8TX82VJ.jpg"] });
  }
}
