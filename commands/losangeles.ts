import * as DJ from "discord.js";
import { getImageFromAssets } from "../util";

export function losangeles(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("/losangeles") >= 0) {
    msg.channel.send(msg.author, {
      files: [getImageFromAssets("losangeles.gif")],
    });
  }
}
