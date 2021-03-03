import * as DJ from "discord.js";

export function swapGame(bot: DJ.Client) {
  bot.user?.setPresence({
    activity: {
      name: pickGame(),
      type: "PLAYING",
    },
  });

  setTimeout(swapGame, 600 * 1000);
}

function pickGame() {
  const numGames = gameList.length;
  const choice = Math.floor(Math.random() * numGames);
  return gameList[choice];
}

const gameList = [
  "Dino Crisis 2",
  "Omikron: The Nomad Soul",
  "Halo: Combat Evolved",
  "Lego Island 2: The Brickster's Revenge",
  "Pajama Sam 2: Thunder and Lightning Aren't So Frightening",
  "Visual Studio 2003",
  "2048",
  "Dear Esther",
  "Seiken Densetsu 3",
  "Jeff",
  "Harvest Moon 64",
  "Perfect Dark",
  "House of the Dead 4",
  "Kirby Air Ride",
  "Quake 3: Arena",
  "VVVVVV",
  "Dr. Robotnik's Mean Bean Machine",
  "[S02E09] The Wire.mp4",
  "Clannad: After Story",
  "Dance Dance Revolution Extreme 2",
  "Guitar Hero 2",
  "Starcraft: Brood War",
  "Strong Bad's Cool Game for Attractive People",
  "Tabletop Simulator",
  "Starseed Pilgrim",
  "Sonic (The Good One)",
  "Spider Solitaire",
  "RPGMaker XP",
  "Blender",
  "Phoenix Wright Ace Attorney: Trials and Tribulations",
  "Brain Age: Train Your Brain in Minutes a Day!",
  "Super Mario Land 2: The Six Golden Coins",
  "Missile Command",
  "Bubsy 3D",
  "Bonzi Buddy Adventure 2",
  "Glover",
  "Doom 64",
  "Beneath a Steel Sky",
  "NetHack",
  "Minecraft Alpha 1.2.1",
  "SuperTuxKart",
  "Freeciv",
  "Spore",
  "Fable II",
  "Star Wars: Dark Forces",
  "Microsoft Combat Flight Simulator 2: Pacific Theater",
  "Medal of Honor: Frontline",
  "Super Contra",
  "Nekketsu KouKou Dodgeball Bu",
  "[★★TF2★★] DARKRP's Mario Kart Orange Idle Trade 24/7 [AllCrit|LowGrav|InstantRespawn|1110% CRITS|Instant Respawn]",
  "Tooth and Tail",
  "Pong",
  "World of Warcraft",
  "Baldur’s Gate II: Shadows of Amn",
  "Incarceration Fault",
  "Sokoban",
  "Nabokos",
  "CSE 125",
  "Doggo",
  "Chicken Odyssey",
  "Global Thermonuclear War",
  "The Simpsons: Hit & Run",
  "Street Fighter II' Turbo: Hyper Fighting",
  "Star Wars: Galaxies",
  "Pineapple Pandemic 2: The Lost Levels",
  "Homeworld Remastered Collection",
  "Homeworld: Deserts of Kharak",
  "Star Wars Knights of the Old Republic",
  "Star Wars Knights of the Old Republic II: The Sith Lords",
  "Bioshock: Infinite",
  "To the Moon",
  "Runescape",
  "???",
  "Marathon",
  "Frog Fractions",
  "Pokemon Pinball",
  "Yu-Gi-Oh! - The Eternal Duelist Soul",
];
