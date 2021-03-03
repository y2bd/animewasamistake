import * as DJ from "discord.js";
const google = require("google");
google.resultsPerPage = 5;

let lastSearch = new Date();
let searchQueued = false;
export function xkcdSearch(bot: DJ.Client, msg: DJ.Message) {
  const re = /\/xkcds ([\w ]+)*/;
  const match = msg.content.toLowerCase().match(re);

  if (match && match[1] && !searchQueued) {
    const str = match[1];
    console.log("Running xkcds for " + str);

    const curr = new Date();
    const diff = Math.max(
      1000 * 30 - (curr.getTime() - lastSearch.getTime()),
      0
    );

    searchQueued = true;
    setTimeout(
      () =>
        google("site:xkcd.com " + str, (err: Error, res: any) => {
          lastSearch = new Date();
          searchQueued = false;
          if (err) {
            msg.channel.send("I had an issue while looking it up :(");
            return;
          }

          if (res.links.length <= 0) {
            msg.channel.send("I couldn't find any matching comics :(");
            return;
          }

          let link = res.links[0].href;
          msg.channel.send(msg.author + " " + link);
        }),
      diff
    );
  }
}
