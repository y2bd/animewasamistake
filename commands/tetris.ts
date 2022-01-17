import * as DJ from "discord.js";

export function tetris(bot: DJ.Client, msg: DJ.Message) {
  if (msg.content.toLowerCase().startsWith("/tetris")) {
    startTetrisSession(bot, msg);
  }

  if (msg.content.toLowerCase().startsWith("/trsp")) {
    continueTetrisSession(bot, msg);
  }
}

type PlayerId = string;

type Session = {
  playerId: PlayerId;
  answer: string;
  guesses: string[];
  deadLetters: Set<string>;
};

const activeSessions: Record<PlayerId, Session> = {};

function startTetrisSession(bot: DJ.Client, msg: DJ.Message) {
  const currentPlayerId = msg.author.id;
  if (activeSessions[currentPlayerId]) {
    return msg.reply(
      "You already have an ongoing Tetris game. Use /trsp <guess> to continue playing."
    );
  }

  msg.reply("Let's play Tetris! Guess a five-letter word with /trsp <guess>.");

  activeSessions[currentPlayerId] = {
    playerId: currentPlayerId,
    answer: words[Math.floor(Math.random() * words.length)],
    guesses: [],
    deadLetters: new Set<string>(),
  };
}

function continueTetrisSession(bot: DJ.Client, msg: DJ.Message) {
  const currentPlayerId = msg.author.id;
  if (!activeSessions[currentPlayerId]) {
    return msg.reply(
      "You've not started playing Tetris yet! Start a game with /tetris."
    );
  }

  const currentSession = activeSessions[currentPlayerId];
  const guess = msg.content.toLowerCase().split(" ")[1].slice(0, 5);

  if (currentSession.answer === guess) {
    msg.reply(
      `Congrats, you got it! It took you ${
        currentSession.guesses.length + 1
      } guess(es).`
    );
    delete activeSessions[currentPlayerId];
    return;
  }

  let response = ["", "", "", "", ""];
  let claimedLetterIndices: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (guess[i] === currentSession.answer[i]) {
      response[i] = ":green_square:";
      claimedLetterIndices.push(i);
    }
  }

  for (let i = 0; i < 5; i++) {
    if (
      currentSession.answer.includes(guess[i]) &&
      !claimedLetterIndices.includes(i)
    ) {
      response[i] = ":yellow_square:";
    } else if (!claimedLetterIndices.includes(i)) {
      response[i] = ":black_large_square:";
      currentSession.deadLetters.add(guess[i]);
    }
  }

  msg.reply(
    "You guessed '" +
      guess.toUpperCase() +
      "', your result is " +
      response.join("") +
      ", dead letters are " +
      Array.from(currentSession.deadLetters)
        .slice()
        .sort()
        .join("")
        .toUpperCase()
  );
  currentSession.guesses.push(guess);
}

const words = [
  "about",
  "above",
  "admit",
  "adult",
  "after",
  "again",
  "agent",
  "agree",
  "ahead",
  "allow",
  "alone",
  "along",
  "among",
  "apply",
  "argue",
  "avoid",
  "begin",
  "black",
  "blood",
  "board",
  "break",
  "bring",
  "build",
  "carry",
  "catch",
  "cause",
  "chair",
  "check",
  "child",
  "civil",
  "claim",
  "class",
  "clear",
  "close",
  "coach",
  "color",
  "could",
  "court",
  "cover",
  "crime",
  "death",
  "dream",
  "drive",
  "early",
  "eight",
  "enjoy",
  "enter",
  "event",
  "every",
  "exist",
  "field",
  "fight",
  "final",
  "first",
  "floor",
  "focus",
  "force",
  "front",
  "glass",
  "great",
  "green",
  "group",
  "guess",
  "happy",
  "heart",
  "heavy",
  "hotel",
  "house",
  "human",
  "image",
  "issue",
  "large",
  "later",
  "laugh",
  "learn",
  "least",
  "leave",
  "legal",
  "level",
  "light",
  "local",
  "major",
  "maybe",
  "media",
  "might",
  "model",
  "money",
  "month",
  "mouth",
  "movie",
  "music",
  "never",
  "night",
  "north",
  "occur",
  "offer",
  "often",
  "order",
  "other",
  "owner",
  "paper",
  "party",
  "peace",
  "phone",
  "piece",
  "place",
  "plant",
  "point",
  "power",
  "price",
  "prove",
  "quite",
  "radio",
  "raise",
  "range",
  "reach",
  "ready",
  "right",
  "scene",
  "score",
  "sense",
  "serve",
  "seven",
  "shake",
  "share",
  "shoot",
  "short",
  "since",
  "skill",
  "small",
  "smile",
  "sound",
  "south",
  "space",
  "speak",
  "spend",
  "sport",
  "staff",
  "stage",
  "stand",
  "start",
  "state",
  "still",
  "stock",
  "store",
  "story",
  "study",
  "stuff",
  "style",
  "table",
  "teach",
  "thank",
  "their",
  "there",
  "these",
  "thing",
  "think",
  "third",
  "those",
  "three",
  "throw",
  "today",
  "total",
  "tough",
  "trade",
  "treat",
  "trial",
  "truth",
  "under",
  "until",
  "value",
  "visit",
  "voice",
  "watch",
  "water",
  "where",
  "which",
  "while",
  "white",
  "whole",
  "whose",
  "woman",
  "world",
  "worry",
  "would",
  "write",
  "wrong",
  "young",
];
