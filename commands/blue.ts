import * as DJ from "discord.js";

export function blue(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content === "/blue") {
    msg.channel.send("", {
      files: ["https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg"],
    });
  }
}
