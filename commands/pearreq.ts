import * as DJ from "discord.js";
import scrapeIt from "scrape-it";
const imgur = require("imgur");

export function pearRequest(bot: DJ.Client, msg: DJ.Message) {
  const re = /.*(penny-arcade.com\/comic\/[0123456789\/]+).*/;
  const match = msg.content.toLowerCase().match(re);

  if (match) {
    fetchPear(msg, match[1]);
  }
}

function fetchPear(msg: DJ.Message, url: string) {
  scrapeIt(
    "http://" + url,
    {
      comic: {
        selector: "div#comicFrame img",
        attr: "src",
      },
    },
    (err, obj: any) => {
      if (!err) {
        imgur.uploadUrl(obj.comic).then((json: any) => {
          msg.channel.send(json.data.link);
        });
      }
    }
  );
}
