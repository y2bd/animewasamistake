import * as DJ from "discord.js";
import levenshtein from "js-levenshtein";

export function tomatoTown(bot: DJ.Client, msg: DJ.Message) {
  for (const [index, lyric] of song.entries()) {
    if (index >= song.length - 1) {
      return;
    }

    const minimizedMessage = minimize(msg.content);
    const minimizedLyric = minimize(lyric);

    if (levenshtein(minimizedMessage, minimizedLyric) <= 8) {
      msg.channel.send(song[index + 1]);
    }
  }
}

function minimize(str: string) {
  str = str.toLowerCase();
  str = str.normalize("NFC");
  str = str.replace(/W/g, "");
  return str;
}

const song = `Got a number one victory royale
Yeah fortnite we bout to get down (get down!)
Ten kills on the board right now
Just wiped out tomato town
My friends just go down
I’ve revived him now we’re heading south bound
Now we’re in the pleasant park streets
Look at the map go to the mark sheets
Take me to your Xbox to play fortnite today
You can take me to moist mire but not loot lake
I would really love to, chug with you
We can be pro fortnite gamers
He said hey broski
You got some heals and a shield pot
I need healing and I am only at one HP
Hey dude sorry, I found nothing on the safari
I checked the upstairs of that house but not the underneath yet
There’s a chest that’s just down there
The storm is coming fast and you need heals to prepare
I’ve V-Bucks that I’ll spend
More than you can contend
I’m a cool pro fortntie gamer
Cool pro fortntie ga-
Take me to your Xbox to play fortnite today
You can take me to moist mire but not loot lake
I really love to, chug with you
We can be pro fortnite gamers
La la la la la ee a
La la la la la ee a
La la la la la ee a
Yeah you be my pro fortnite gamer
Pro fortnite gamer
Can we get a win this weekend
Take me to loot lake
Let’s change the game mode and we can disco dominate
We’ll top an ATK take me to the zone
I’m running kinda low on mats
I need to break some stone
Dressed in all these fancy clothes
He’s got Renegade Raider
And he’s probably a pro
He just shot my back
I turn back and I attack
I just got a victory royale
A victory royale
Take me to your Xbox to play fortnite today
You can take me to moist mire but not loot lake
I really love to, chug with you
We can be pro fortnite gamers`.split("\n");
