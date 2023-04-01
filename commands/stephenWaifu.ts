import * as DJ from "discord.js";

export function stephenWaifu(bot: DJ.Client, msg: DJ.Message) {
  if (
    msg.content
      .toLowerCase()
      .match(
        /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g
      )
    && Math.random() < 0.05
  ) {
    msg.react("😍");
    msg.channel.send(msg.author, {
      files: ["https://i.imgur.com/VGiD6d6.png"],
    });
  }
}
