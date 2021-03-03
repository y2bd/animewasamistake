import * as DJ from "discord.js";

export function girafarig(bot: DJ.Client, msg: DJ.Message) {
  if (
    msg.content.toLowerCase().indexOf("girafarig") + 1 ||
    msg.content.toLowerCase().indexOf("ghirahim") + 1
  ) {
    msg.channel.send(msg.author, {
      files: ["https://i.imgur.com/B4YqlZr.png"],
    });
  }
}
