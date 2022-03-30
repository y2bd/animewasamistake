import * as DJ from "discord.js";
const IM = require("imagemagick-cli");

export function grace(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().indexOf("/grace") + 1) {
    const body = msg.content.substring("/grace ".length);
    console.log("We gracin", body);

    runIM(body).then(({ filename }) => {
      msg.reply({ files: ["assets/" + filename] });
    });
  }
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
