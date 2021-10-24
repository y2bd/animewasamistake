import * as DJ from "discord.js";

export function irony(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().endsWith("/s") && Math.random() < 0.25) {
    const austinEmoji = bot.emojis.cache.find(
      (emoji) => emoji.name === "pikapikaaustin"
    );
    if (austinEmoji) {
      msg.react(austinEmoji);
    }
  }
}
