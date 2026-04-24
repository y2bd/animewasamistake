import * as DJ from "discord.js";
import { getImageFromAssets } from "../util";

export function dearDexter(bot: DJ.Client, msg: DJ.Message) {
  if (
    msg.content === "/deardexter" ||
    (msg.content === "/dearme" &&
      msg.author.username.indexOf("afrodynamics") >= 0)
  ) {
    msg.channel.send("", { files: [getImageFromAssets("deardexter.png")] });
  }
}
