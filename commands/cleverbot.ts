import DJ from "discord.js";
import secrets from "../secrets";
const cbn = require("cleverbot-node");

const cb = new cbn();
cb.configure({ botapi: secrets.clever });

export function cleverbot(bot: DJ.Client, msg: DJ.Message) {
  if ((bot.user && msg.mentions.has(bot.user)) || Math.random() < 0.002) {
    cb.write(msg.content, (response: any) => {
      if (response && response.output) {
        msg.channel.send(msg.author.toString() + " " + response.output);
      }
    });
  } else if (Math.random() < 0.0005) {
    msg.channel.send(msg.author.toString() + " " + sponge(msg.content));
  }
}

export function sponge(str: string) {
  let built = "";
  for (let c = 0; c < str.length; c++) {
    let lc = typeof str[c] === "string" ? str[c].toLowerCase() : "";
    if (Math.random() > 1 / 2) {
      lc = lc.toUpperCase();
    } else {
    }

    built += lc;
  }

  return built;
}
