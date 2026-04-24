import * as DJ from "discord.js";
import { slashes } from "../util";

export function alexSays(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("/alexsays") + 1) {
    msg.channel.send(
      "<:rekwah:298691352210964480> ＤＲＩＮＫＹＯＵＶＥＧＥＭＩＴＥ <:hawker:298689474802483201>",
    );
  }

  if (slashes(msg, "jonesysays")) {
    msg.channel.send(
      "<:rektwah:831369085484793867> ＣＨＵＧＹＯＵＪＵＧ <:waahh:456995320937578508>",
    );
  }
}
