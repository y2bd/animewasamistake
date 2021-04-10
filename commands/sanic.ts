import * as DJ from "discord.js";

export function sanic(bot: DJ.Client, msg: DJ.Message) {
  if (
    words.filter(
      (word) => msg.content && msg.content.toLowerCase().indexOf(word) > -1
    ).length > 0
  ) {
    const sanicEmoji = bot.emojis.cache.find((emoji) => emoji.name === "sanic");
    if (sanicEmoji) {
      msg.react(sanicEmoji);
    }
  }
}

const words = [
  "sanic",
  "sonic",
  "fast",
  "speed",
  "quick",
  "zoom",
  "run",
  "sprint",
  "tails",
  "knuckles",
  "amy",
  "hedgehog",
];
