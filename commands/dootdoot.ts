import * as DJ from "discord.js";

export function dootdoot(bot: DJ.Client, msg: DJ.Message) {
  if (
    msg.content &&
    msg.content.toLowerCase &&
    msg.content.toLowerCase() === "doot doot"
  ) {
    msg.channel.send("🎺 🎺");
  }
}
