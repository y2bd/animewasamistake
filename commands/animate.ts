import * as DJ from "discord.js";
import { replaceAt } from "../util";

export function animate(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content === "/testanim" && msg.author.username.indexOf("y2bd") >= 0) {
    animateFirst(msg, 0);
  }
}

function animateFirst(msg: DJ.Message, i: number) {
  const max = 20;
  const str = "--------------------";

  const fun = replaceAt(str, i, "=");
  msg.channel.send(fun).then((next) => {
    if (i + 1 < max) {
      setTimeout(() => animateNext(next, i + 1), 1000);
    }
  });
}

function animateNext(msg: DJ.Message, i: number) {
  const max = 20;
  const str = "--------------------";

  const fun = replaceAt(str, i, "=");
  msg.edit(fun).then((next) => {
    if (i + 1 < max) {
      setTimeout(() => animateNext(next, i + 1), 1000);
    }
  });
}
