import * as DJ from "discord.js";
import { getImageFromAssets } from "../util";

export function nootnoot(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("noot noot") + 1) {
    msg.channel.send(msg.author, {
      files: [getImageFromAssets("nootnoot.jpg")],
    });
  }
}
