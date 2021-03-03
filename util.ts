import * as DJ from "discord.js";

export function replaceAt(from: string, index: number, replacement: string) {
  return (
    from.substr(0, index) +
    replacement +
    from.substr(index + replacement.length)
  );
}

export function capitalize(s: string) {
  return s
    .split(" ")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");
}

export function getMatch(re: RegExp, msg: DJ.Message) {
  let rem = re.exec(msg.content.toLowerCase());
  if (
    !msg.author.bot &&
    !msg.content.toLowerCase().includes("anime-was-a-mistake") &&
    rem !== null
  ) {
    return rem[0];
  }

  return null;
}

export function toRegex(s: string) {
  let res = "\\b";

  for (let i = 0, len = s.length; i < len; i++) {
    res += s[i] + "+";
  }

  res += "\\b";

  return new RegExp(res);
}
