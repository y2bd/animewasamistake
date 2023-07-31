import * as DJ from "discord.js";
import { DateTime, Zone } from "luxon";

export function tomatoTime(bot: DJ.Client, msg: DJ.Message) {
  if (
    !msg.content.toLowerCase().includes("/tomatotime") &&
    !msg.content.toLowerCase().includes("/angietime") &&
    !msg.content.toLowerCase().includes("/tt") &&
    !msg.content.toLowerCase().includes("/at")
  ) {
    return;
  }

  try {
    const timeMatch = msg.content
      .toLowerCase()
      .match(
        /\/(?<cmd>tomatotime|tt|angietime|at) (?<hour>[0-9]{1,2})(?::?(?<min>[0-9]{1,2}))?\W*(?<ampm>am?|pm?)?/
      );

    const currentLosAngelesTime = DateTime.now().setZone("America/Los_Angeles");
    const hour = +(timeMatch?.groups?.hour ?? currentLosAngelesTime.hour) % 24;
    const minute =
      // +(timeMatch?.groups?.min ?? currentLosAngelesTime.minute) % 60;
      (() => {
        if (timeMatch?.groups?.min !== undefined) {
          return +timeMatch.groups.min % 60;
        } else if (timeMatch?.groups?.hour !== undefined) {
          // if they specify an hour assume zero minutes
          return 0;
        } else {
          // assume current time
          return currentLosAngelesTime.minute;
        }
      })();

    const ampm: string =
      timeMatch?.groups?.ampm ??
      (currentLosAngelesTime.hour > 12 ? "pm" : "am");

    let adjustedHour = hour;
    if (ampm.startsWith("a") && hour === 12) {
      adjustedHour = 0;
    }

    if (ampm.startsWith("p") && hour < 12) {
      adjustedHour = hour + 12;
    }

    console.log(adjustedHour, minute, hour, ampm);

    let currentDate = DateTime.fromObject(
      { hour: adjustedHour, minute },
      { zone: "America/Los_Angeles" }
    ).toLocaleString(DateTime.TIME_SIMPLE);

    let melbourneDate = DateTime.fromObject(
      { hour: adjustedHour, minute },
      { zone: "America/Los_Angeles" }
    )
      .setZone("Asia/Tokyo")
      .toLocaleString(DateTime.TIME_SIMPLE);

    let losAngelesDate = DateTime.fromObject(
      { hour: adjustedHour, minute },
      { zone: "Asia/Tokyo" }
    )
      .setZone("America/Los_Angeles")
      .toLocaleString(DateTime.TIME_SIMPLE);

    msg.channel.send(
      `If it's ${currentDate} in Osaka, it would be **${losAngelesDate}** in SF.`
    );

    msg.channel.send(
      `If it's ${currentDate} in San Francisco, it would be **${melbourneDate}** in Osaka.`
    );
  } catch (err) {
    msg.channel.send(
      msg.author.toString() + " I couldn't parse that unfortunately"
    );
  }
}
