import * as DJ from "discord.js";
import { getImageFromAssets } from "../util";

export function girafarig(bot: DJ.Client, msg: DJ.Message) {
  if (
    msg.content.toLowerCase().indexOf("girafarig") + 1 ||
    msg.content.toLowerCase().indexOf("ghirahim") + 1
  ) {
    msg.channel.send(msg.author, {
      files: [getImageFromAssets("girafarig.png")],
    });
  }
}
