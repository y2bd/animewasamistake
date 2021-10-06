import * as DJ from "discord.js";
import { DateTime, Zone } from "luxon";

export function tomatoTime(bot: DJ.Client, msg: DJ.Message) {
  if (!msg.content.toLowerCase().startsWith("/tomatotime")) {
    return;
  }

  try {
    const timeMatch = msg.content
      .toLowerCase()
      .match(
        /\/tomatotime (?<hour>[0-9]{1,2})(?::(?<min>[0-9]{1,2}))?\W*(?<ampm>am|pm)$/
      );

    const currentLosAngelesTime = DateTime.now().setZone("America/Los_Angeles");
    const hour = +(timeMatch?.groups?.hour ?? currentLosAngelesTime.hour) % 24;
    const minute = +(timeMatch?.groups?.min ?? "00") % 60;

    const ampm: string =
      timeMatch?.groups?.ampm ??
      (currentLosAngelesTime.hour > 12 ? "pm" : "am");

    let adjustedHour = hour;
    if (ampm === "am" && hour === 12) {
      adjustedHour = 0;
    }

    if (ampm === "pm" && hour < 12) {
      adjustedHour = hour + 12;
    }

    console.log(adjustedHour, minute, hour, ampm);

    let losAngelesDate = DateTime.fromObject(
      { hour: adjustedHour, minute },
      { zone: "America/Los_Angeles" }
    );
    let melbourneDate = DateTime.fromObject(
      { hour: adjustedHour, minute },
      { zone: "Australia/Melbourne" }
    );

    msg.channel.send(
      `If that time was from Melbourne, it would be **${melbourneDate
        .setZone("America/Los_Angeles")
        .toLocaleString(DateTime.TIME_SIMPLE)}** in LA.`
    );

    msg.channel.send(
      `If that time was from Los Angeles, it would be **${losAngelesDate
        .setZone("Australia/Melbourne")
        .toLocaleString(DateTime.TIME_SIMPLE)}** in Melbourne.`
    );
  } catch (err) {
    msg.channel.send(
      msg.author.toString() + " I couldn't parse that unfortunately"
    );
  }
}
