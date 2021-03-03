import * as DJ from "discord.js";

export function alexSays(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("/alexsays") + 1) {
    msg.channel.send(
      "<:rekwah:298691352210964480> ＤＲＩＮＫＹＯＵＶＥＧＥＭＩＴＥ <:hawker:298689474802483201>"
    );
  }
}
