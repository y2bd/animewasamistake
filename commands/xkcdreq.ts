import * as DJ from "discord.js";
import request from "request";

export function xkcdRequest(bot: DJ.Client, msg: DJ.Message) {
  if (!xkcdUrlMatch(msg)) {
    xkcdNumberMatch(msg);
  }
}

function xkcdUrlMatch(msg: DJ.Message) {
  let re = /(http[s]*:\/\/)?www.xkcd.com\/(\d*)[\/]*/;
  let match = msg.content.toLowerCase().match(re);

  if (match) {
    fetchXkcd(msg, match[2]);
    return true;
  } else {
    return false;
  }
}

function xkcdNumberMatch(msg: DJ.Message) {
  if (msg.author.bot) return;

  let re = /\/xkcd[ ]*(\d*)/;
  let match = msg.content.toLowerCase().match(re);

  if (match) {
    fetchXkcd(msg, match[1]);
  }
}

function fetchXkcd(msg: DJ.Message, number: string) {
  let url = "http://xkcd.com/info.0.json";
  if (number) {
    url = "http://xkcd.com/" + number + "/info.0.json";
  } else {
    return;
  }

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const json = JSON.parse(body);
      const url = json.img;
      const alt = json.alt;

      postXkcd(msg, url, alt);
    }
  });
}

function postXkcd(msg: DJ.Message, url: string, alt: string) {
  msg.channel.send(url);
  msg.channel.send("*" + alt + "*");
}
