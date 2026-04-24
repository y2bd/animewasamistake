import * as Discord from "discord.js";
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
import { grace } from "./commands/grace";
import { irony } from "./commands/irony";
import { losangeles } from "./commands/losangeles";
import { nootnoot } from "./commands/nootnoot";
import { swapGame } from "./commands/pickagame";
import { pressXToJson } from "./commands/pressXToJson";
import { roll } from "./commands/roll";
import { sanic } from "./commands/sanic";
import { tetris } from "./commands/tetris";
import { tomatoTime } from "./commands/tomatoTime";
import { tomatoTown } from "./commands/tomatoTown";

const commands = [
  alexSays,
  animate,
  animeWasAMistake,
  anxiety,
  blue,
  dearDexter,
  dootdoot,
  exodia,
  girafarig,
  grace,
  irony,
  losangeles,
  nootnoot,
  pressXToJson,
  roll,
  sanic,
  tetris,
  tomatoTime,
  tomatoTown,
];

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("ready!");
  swapGame(bot);
});

bot.on("message", (msg) => {
  // don't respond to bots
  if (msg.author.bot) return;

  for (const command of commands) {
    const result = command(bot, msg);
    if (typeof result !== "undefined" && !!result) {
      break;
    }
  }

  cleverbot(bot, msg);
});

bot.on("messageDelete", (msg) => {
  if (
    (msg.author?.username ?? "").indexOf("Chalybs") >= 0 &&
    Math.random() > 0.5
  ) {
    msg.reply("Hey I saw that!");
  }
});

console.log("logging in");
bot.login(process.env.DISCORD_SECRET);

process.on("uncaughtExceptionMonitor", (err: Error, origin: unknown) => {
  console.error("Error while running", err, origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
