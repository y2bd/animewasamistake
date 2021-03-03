import * as DJ from "discord.js";
import { toRegex, getMatch, capitalize } from "../util";

export function animeWasAMistake(bot: DJ.Client, msg: DJ.Message) {
  for (const word of wordlist) {
    const re = toRegex(word);
    const match = getMatch(re, msg);

    if (match !== null && Math.random() < 0.05) {
      const was = word.slice(-1) == "s" ? "were" : "was";
      return msg.reply(capitalize(word) + " " + was + " a mistake.");
    }
  }
}

const wordlist = [
  "chinese cartoons",
  "chinese cartoon",
  "mahou shoujo",
  "mahou",
  "black hat guy",
  "shoujo",
  "manga",
  "amine",
  "shounen",
  "seinen",
  "josei",
  "japanese cartoons",
  "chinese cartoons",
  "magical girls",
  "magical girl",
  "moeblob",
  "moe",
  "snake",
  "python",
  "emacs",
  "slice of life",
  "visual novel",
  "hentai",
  "ecchi",
  "tentacle",
  "kawaii",
  "senpai",
  "sempai",
  "kouhai",
  "vn",
  "java",
  "jason",
  "desu",
  "evangelion",
  "kill la kill",
  "sword art online",
  "katawa shoujo",
  "no game no life",
  "ngnl",
  "ghost in the shell",
  "stand alone complex",
  "gits",
  "jeff",
  "madoka",
  "date a live",
  "vocaloid",
  "hatsune miku",
  "touhou",
  "haruhi",
  "k-on",
  "angel beats",
  "nichijou",
  "nichijoint",
  "dragon ball",
  "naruto",
  "bleach",
  "magnums",
  "waifu",
  "husbando",
  "hikokomori",
  "neet",
  "anime",
  "weabo",
];
