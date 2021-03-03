import * as DJ from "discord.js";

const typingTime = 1000 * 10;
let isTyping = false;

export function anxiety(bot: DJ.Client, msg: DJ.Message) {
  if (Math.random() < 0.01 && !isTyping) {
    isTyping = true;
    msg.channel.startTyping();
    setTimeout(() => {
      msg.channel.stopTyping(true);
      isTyping = false;
    }, typingTime);
  }
}
