import * as DJ from "discord.js";
const cbn = require("cleverbot-node");

const cb = new cbn();
cb.configure({ botapi: process.env.CLEVER_TOKEN });

export function cleverbot(bot: DJ.Client, msg: DJ.Message) {
  if (bot.user && msg.mentions.has(bot.user)) {
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
    const cc = str[c];
    let lc = typeof cc === "string" ? cc.toLowerCase() : "";
    if (Math.random() > 1 / 2) {
      lc = lc.toUpperCase();
    } else {
    }

    built += lc;
  }

  return built;
}
