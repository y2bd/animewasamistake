import * as DJ from "discord.js";
import d20 from "d20";

export function roll(bot: DJ.Client, msg: DJ.Message) {
  try {
    const rollMatch = msg.content.match(
      /\/roll ([0-9d+\- ]+)(?:(?:for )(.*))?/
    );
    if (rollMatch && rollMatch[1]) {
      const firstNum = rollMatch[1].match(/(\d+)/g);
      if (firstNum && firstNum[1]) {
        var i = 1;
        while (true) {
          if (!Number.isFinite(Number.parseInt(firstNum[i]))) {
            break;
          }

          if (Number.parseInt(firstNum[i]) > 123456) {
            msg.channel.send(msg.author + " No.");
            return;
          }

          i += 1;
        }
      }

      const result = d20.roll(rollMatch[1]);
      const type = rollMatch[2] ? "for " + rollMatch[2].trim() + " " : "";
      if (result === 0) {
        msg.channel.send(
          msg.author.toString() +
            " rolled " +
            "0 " +
            type +
            "(which means you either input an incorrect roll command, or you rolled a zero somehow)"
        );
      } else {
        msg.channel.send(
          msg.author.toString() + " rolled " + String(result) + " " + type
        );
      }
    }
  } catch (err) {
    msg.channel.send(msg.author.toString() + " please don't ");
  }
}
