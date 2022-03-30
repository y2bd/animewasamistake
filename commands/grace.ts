import * as DJ from "discord.js";
const IM = require("imagemagick-cli");
import GM from "gm";
import * as fs from "fs";

export function grace(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("/grace") + 1) {
    const body = msg.content.substring("/grace ".length);
    console.log("We gracin", body);

    runGM(body).then(({ filename }) => {
      msg.reply({ files: [filename] });

      setTimeout(() => {
        fs.unlinkSync(filename);
      }, 15 * 1000);
    });
  }
}

function runGM(text: string): Promise<{ filename: string }> {
  const filename = `grace_${new Date().getTime()}.png`;

  return new Promise((res, rej) => {
    GM.subClass({ imageMagick: true })(undefined as any)
      .command("convert")
      .font("assets/font.ttf")
      .background("none")
      .fill("#cbcbcb")
      .pointSize(24)
      .out("-size", "520x")
      .out("-interline-spacing", "8")
      .out(`caption:${text}`)
      .out("assets/template.png")
      .out("+swap")
      .gravity("North")
      .geometry("+0+45")
      .out("-composite")
      .write(`assets/${filename}`, (err, stdout, stderr, cmd) => {
        console.log("Done GM", cmd);
        if (err) {
          rej(err);
        } else {
          res({ filename: `assets/${filename}` });
        }
      });
  });
}

function runIM(text: string): Promise<{ filename: string }> {
  const filename = `grace_${new Date().getTime()}.png`;

  const command =
    `convert -font assets/font.ttf -background none -fill "#cbcbcb" -pointsize 24 -size 520x -interline-spacing 8 \\` +
    `caption:"${text}" \\` +
    `assets/template.png +swap -gravity north -geometry +0+45 -composite assets/${filename}`;

  return IM.exec(command).then((result: {}) =>
    Object.assign(result, { filename })
  );
}
