import * as DJ from "discord.js";
import request from "request";

export function whenGame(bot: DJ.Client, msg: DJ.Message) {
  if (bot.user && msg.mentions.has(bot.user)) {
    const whenGameRegex = /when (?:does|do|did|will|is) (.+) (?:come|coming|gonna be|will be)? (?:out)?/;
    const match = msg.content.toLowerCase().match(whenGameRegex);

    if (match) {
      if (match[1].indexOf("destiny 2") + 1) {
        const destiny2KJokes = [
          'if (strcmp(*match[1], "Destiny 2")) { printf(destiny2ReleaseDateForPC()) } else { printf(search(&match[1])) }',
          'print(destiny2_release_date_for_pc() if match[1] == "Destiny 2" else search(match[1]))',
          'if (match[1] === "Destiny 2") { print(destiny2ReleaseDateForPC()) } else { print(search(match[1)) }',
          'if (match[1].equals("Destiny 2")) { System.out.println(destiny2ReleaseDateForPC()) } else { System.out.println(search(match[1)) }',
          '(print (if (eq (index match 1) "Destiny 2") (destiny2ReleaseDateForPC) (search (index match 1))))',
          'print (if ((snd match) = "Destiny 2") then (destiny2ReleaseDateForPC ()) else (search (snd match)))',
        ];
        const selectedJoke = Math.floor(Math.random() * destiny2KJokes.length);

        const responseMsg = msg.channel
          .send(msg.author + " " + destiny2KJokes[selectedJoke])
          .then((msgsg) => msgsg.react(":bill_bill_bill:"));
        return;
      }

      const gburl =
        "https://www.giantbomb.com/api/search?api_key=784cd4d79994d600c7fcece2c198b1b859436176&format=json&resources=game&query=" +
        encodeURIComponent(match[1]);
      const options = {
        url: gburl,
        headers: {
          "User-Agent": "anime-was-a-mistake discord bot",
        },
      };

      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const json = JSON.parse(body);
          if (json && json.results.length > 1) {
            const result = json.results[0];
            const name = result.name;
            let dateStr = result.original_release_date;
            if (
              result.expected_release_year &&
              result.expected_release_month &&
              result.expected_release_day
            ) {
              dateStr =
                "" +
                result.expected_release_year +
                "-" +
                result.expected_release_month +
                "-" +
                result.expected_release_day;
            }

            if (!dateStr) {
              msg.channel.send(
                msg.author +
                  " " +
                  "I don't think '" +
                  name +
                  "' has a known release date yet."
              );
              return;
            } else {
              let date = new Date(dateStr);
              let today = new Date();

              const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const datePretty = date.toLocaleDateString(
                "en-US",
                "long" as never
              );

              if (date < today) {
                msg.channel.send(
                  msg.author +
                    " " +
                    "'" +
                    name +
                    "' already came out on " +
                    datePretty +
                    "."
                );
              } else {
                msg.channel.send(
                  msg.author +
                    " " +
                    "'" +
                    name +
                    "' should come out on " +
                    datePretty +
                    "."
                );
              }

              return;
            }
          }
        }

        msg.channel.send(
          msg.author +
            " " +
            "I couldn't be bothered to find the release date of '" +
            match[1] +
            "'."
        );
      });
    }
  }
}
