const Discord = require("discord.js");
const request = require("request");
const scrapeIt = require("scrape-it");
const imgur = require("imgur");
const cbn = require("cleverbot-node");

const bot = new Discord.Client();

let wordlist = ['chinese cartoons', 
                'chinese cartoon', 
                'mahou shoujo',
                'mahou',
                'black hat guy',
                'shoujo',
                'manga',
                'amine',
                'shounen',
                'seinen',
                'josei',
                'japanese cartoons',
                'chinese cartoons',
                'magical girls',
                'magical girl',
                'moeblob',
                'moe',
                'snake',
                'python',
                'emacs',
                'slice of life',
                'visual novel',
                'hentai',
                'ecchi',
                'tentacle',
                'kawaii',
                'senpai',
                'sempai',
                'kouhai',
                'vn',
                'java',
                'jason',
                'desu',
                'evangelion',
                'kill la kill',
                'sword art online',
                'katawa shoujo',
                'no game no life',
                'ngnl',
                'ghost in the shell',
                'stand alone complex',
                'gits',
                'jeff',
                'madoka',
                'date a live',
                'vocaloid',
                'hatsune miku',
                'touhou',
                'haruhi',
                'k-on',
                'angel beats',
                'nichijou',
                'nichijoint',
                'dragon ball',
                'naruto',
                'bleach',
                'magnums',
                'waifu',
                'husbando',
                'hikokomori',
                'neet',
                'anime', 
                'weabo' ];

let gameList = [
        'Dino Crisis 2',
        'Omikron: The Nomad Soul',
        'Halo: Combat Evolved',
        'Lego Island 2: The Brickster\'s Revenge',
        'Pajama Sam 2: Thunder and Lightning Aren\'t So Frightening',
        'Visual Studio 2003',
        '2048',
        'Dear Esther',
        'Seiken Densetsu 3',
        'Jeff',
        'Harvest Moon 64',
        'Perfect Dark',
        'House of the Dead 4',
        'Kirby Air Ride',
        'Quake 3: Arena',
        'VVVVVV',
        'Dr. Robotnik\'s Mean Bean Machine',
        '[S02E09] The Wire.mp4',
        'Clannad: After Story',
        'Dance Dance Revolution Extreme 2',
        'Guitar Hero 2',
        'Starcraft: Brood War',
        'Strong Bad\'s Cool Game for Attractive People',
        'Tabletop Simulator',
        'Starseed Pilgrim',
        'Sonic (The Good One)',
        'Spider Solitaire',
        'RPGMaker XP',
        'Blender',
        'Phoenix Wright Ace Attorney: Trials and Tribulations',
        'Brain Age: Train Your Brain in Minutes a Day!',
        'Super Mario Land 2: The Six Golden Coins',
        'Missile Command',
        'Bubsy 3D',
        'Bonzi Buddy Adventure 2',
        'Glover',
        'Doom 64',
        'Beneath a Steel Sky',
        'NetHack',
        'Minecraft Alpha 1.2.1',
        'SuperTuxKart',
        'Freeciv',
        'Spore',
        'Fable II',
        'Star Wars: Dark Forces',
        'Microsoft Combat Flight Simulator 2: Pacific Theater',
        'Medal of Honor: Frontline',
        'Super Contra',
        'Nekketsu KouKou Dodgeball Bu',
        '[★★TF2★★] DARKRP\'s Mario Kart Orange Idle Trade 24/7 [AllCrit|LowGrav|InstantRespawn|1110% CRITS|Instant Respawn]',
        'Tooth and Tail',
        'Pong',
        'World of Warcraft',
        'Baldur’s Gate II: Shadows of Amn',
        'Incarceration Fault',
        'Sokoban',
        'Nabokos',
        'CSE 125',
        'Doggo',
        'Chicken Odyssey',
        'Global Thermonuclear War',
        'The Simpsons: Hit & Run',
        'Street Fighter II\' Turbo: Hyper Fighting',
        'Star Wars: Galaxies',
        'Pineapple Pandemic 2: The Lost Levels',
        'Homeworld Remastered Collection',
        'Homeworld: Deserts of Kharak',
        'Star Wars Knights of the Old Republic',
        'Star Wars Knights of the Old Republic II: The Sith Lords',
        'Bioshock: Infinite',
        'To the Moon',
        'Runescape',
        '???',
        'Marathon',
        'Frog Fractions',
        'Pokemon Pinball',
        'Yu-Gi-Oh! - The Eternal Duelist Soul',
];


function pickGame() {
	let numGames = gameList.length;
	let choice = Math.floor(Math.random() * numGames);
	return gameList[choice];
}

function toRegex(s) {
    let res = '\\b';

    for (let i = 0, len = s.length; i < len; i++) {
        res += s[i] + '+';
    }

    res += '\\b';

    return new RegExp(res);
}

function getMatch(re, msg) {
    let rem = re.exec(msg.content.toLowerCase());
    if (!msg.author.bot &&
        !msg.content.toLowerCase().includes("anime-was-a-mistake") && 
        rem !== null) {
        return rem[0];
    }

    return null;
}

function capitalize(s) {
    return s.split(' ').map(function (s) { return s[0].toUpperCase() + s.slice(1); }).join(' ');
}

function sendResponse(msg, word) {
    jackal.log("[" + word + "] activated me!");

    let was = word.slice(-1) == "s" ? "were" : "was";
    msg.channel.sendMessage(msg.author + ": " + capitalize(word) + " " + was + " a mistake.");
}

function animeWasAMistake(msg) {
    for (let word of wordlist) {
        let re = toRegex(word);
        let match = getMatch(re, msg);        
        if (match !== null && Math.random() < .05) {
            jackal.log('I found an anime term match, ' + match);
            sendResponse(msg, match);
            break;
        }
    }
}

function postXkcd(msg, url, alt) {
    jackal.log("I am posting an XKCD comic, " + url);
    msg.channel.sendMessage(url);
    msg.channel.sendMessage('*' + alt + '*');
}

function fetchXkcd(msg, number) {
    jackal.log("posting xkcd #" + number);

    let url = 'http://xkcd.com/info.0.json';
    if (number) {
        url = 'http://xkcd.com/' + number + '/info.0.json'
    }

    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let json = JSON.parse(body);
            let url = json.img;
            let alt = json.alt;

            postXkcd(msg, url, alt)
        }
    });
}

function xkcdUrlMatch(msg) {
    if (msg.author.bot) return false;

    let re = /(http[s]*:\/\/)?xkcd.com\/(\d*)[\/]*/;
    let match = msg.content.toLowerCase().match(re);

    if (match) {
        fetchXkcd(msg, match[2]);
        return true;
    } else {
        return false;
    }
}

function xkcdRequest(msg) {
    if (msg.author.bot) return; 

    let re = /\/xkcd[ ]*(\d*)/;
    let match = msg.content.toLowerCase().match(re);

    if (match) {
        fetchXkcd(msg, match[1]);
    }
}

function fetchPear(msg, url) {
    jackal.log("I am posting a Penny Arcade comic, " + url);
    scrapeIt("http://" + url, {
        comic: {
            selector: "div#comicFrame img",
            attr: "src",
        },
    }, (err, obj) => {
        if (!err) {
            imgur.uploadUrl(obj.comic)
                .then((json) => {
                    msg.channel.sendMessage(json.data.link);
                }).catch((err) => {
                    jackal.err("I failed to post a Penny Arcade comic, " + url);
                });
        }
    });
}

function pearRequest(msg) {
    let re = /.*(penny-arcade.com\/comic\/[0123456789\/]+).*/;
    let match = msg.content.toLowerCase().match(re);

    if (match) {
        fetchPear(msg, match[1]);
    }
}

const cb = new cbn();
cb.configure({ botapi: require("./secrets").clever });

function cleverbot(msg) {
    if(msg.isMentioned(bot.user) || Math.random() < 0.01) {
        jackal.log("I was mentioned: '" + msg.content + "'");

        cb.write(msg.content, response => {
            if (response && response.output) {
                msg.channel.sendMessage(msg.author + " " + response.output);
            }
        });
    }
}

bot.on('ready', () => {
  jackal.log('I have connected to Discord.');
  swapGame();
});

function swapGame() {
	let picked = pickGame();
	bot.user.setGame(picked);

	setTimeout(() => swapGame(), 10 * 60 * 1000);
}

bot.on("message", msg => {
    if (msg.author.bot) return; 

    if (!xkcdUrlMatch(msg)) {
        xkcdRequest(msg);
    }

    pearRequest(msg);

    cleverbot(msg);

if (msg.content === "/exodia") {
  msg.channel.sendMessage(".\n"+
"ＨＡＨＡＨＡ   <:tidus_tl:326605903254257665><:tidus_tr:326605922682011659>\n"+
"                          \\ <:tidus_bl:326605940206075904><:tidus_br:326605948917645322>");
}

    if (msg.content && msg.content.toLowerCase && msg.content.toLowerCase() === "doot doot") {
        msg.channel.sendMessage("🎺 🎺");
    }

    animeWasAMistake(msg);
});

bot.login(require("./secrets").secret);

const jackal = (function () {
    let logs = [];

    return {
        log: function(text) {
            console.log(text);
            logs.push(text);
        },
        warn: function(text) {
            console.warn(text);            
            logs.push("[[WARNING]] " + text);
        },
        err: function(text) {
            console.err(text);    
            logs.push("[[WARNING]] " + text);
        },
        getLogs: function() {
            return logs.slice();
        }
    };
})();

const express = require('express');
const app = express();

app.get('/', function (req, res) {
    let logBlock = jackal.getLogs().map(log => {
        return "<p>" + log + "</p>";
    });

    res.type("html");
    res.send("<html>" + logBlock);
});

app.listen(process.env.PORT || 3000, function () {
    jackal.log("App listening on port " + (process.env.PORT || 3000));
});
