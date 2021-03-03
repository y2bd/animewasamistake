import Discord from "discord.js";
import { unlink } from "fs";
import { alexSays } from "./commands/alexSays";
import { animate } from "./commands/animate";
import { animeWasAMistake } from "./commands/animewasamistake";
import { anxiety } from "./commands/anxiety";
import { blue } from "./commands/blue";
import { cleverbot } from "./commands/cleverbot";
import { dearDexter } from "./commands/deardexter";
import { dootdoot } from "./commands/dootdoot";
import { exodia } from "./commands/exodia";
import { girafarig } from "./commands/girafarig";
import { nootnoot } from "./commands/nootnoot";
import { pearRequest } from "./commands/pearreq";
import { swapGame } from "./commands/pickagame";
import { pressXToJson } from "./commands/pressXToJson";
import { roll } from "./commands/roll";
import { sanic } from "./commands/sanic";
import { stephenWaifu } from "./commands/stephenWaifu";
import { whenGame } from "./commands/whengame";
import { xkcdRequest } from "./commands/xkcdreq";
import { xkcdSearch } from "./commands/xkcdsearch";
import secrets from "./secrets";

const commands = [
  alexSays,
  animate,
  animeWasAMistake,
  anxiety,
  blue,
  cleverbot,
  dearDexter,
  dootdoot,
  exodia,
  girafarig,
  nootnoot,
  pearRequest,
  pressXToJson,
  roll,
  sanic,
  stephenWaifu,
  whenGame,
  xkcdRequest,
  xkcdSearch,
];

const bot = new Discord.Client();

bot.on("ready", () => {
  swapGame(bot);
});

bot.on("message", (msg) => {
  // don't respond to bots
  if (msg.author.bot) return;

  commands.forEach((command) => command(bot, msg));
});

bot.on("messageDelete", (msg) => {
  if (
    (msg.author?.username ?? "").indexOf("Chalybs") >= 0 &&
    Math.random() > 0.5
  ) {
    msg.reply("Hey I saw that!");
  }
});

bot.login(secrets.secret);

process.on("uncaughtExceptionMonitor", (err: Error, origin: unknown) => {
  console.error("Error while running", err, origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
