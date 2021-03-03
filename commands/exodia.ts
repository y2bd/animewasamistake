import * as DJ from "discord.js";

export function exodia(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content === "/exodia") {
    msg.channel.send(
      ".\n" +
        "ＨＡＨＡＨＡ   <:tidus_tl:326605903254257665><:tidus_tr:326605922682011659>\n" +
        "                          \\ <:tidus_bl:326605940206075904><:tidus_br:326605948917645322>"
    );
  }
}
