import * as DJ from "discord.js";
import { getImageFromAssets } from "../util";

export function pressXToJson(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().match(/.*j+a+s+o+n+!+.*/)) {
    msg.react("🎈");
    msg.channel.send("", {
      reply: msg.author,
      files: [getImageFromAssets("jason.png")],
    });
  }
}
