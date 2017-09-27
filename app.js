const Discord = require("discord.js");
const request = require("request");
const scrapeIt = require("scrape-it");
const imgur = require("imgur");
const cbn = require("cleverbot-node");
const d20 = require("d20");

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
    if(msg.isMentioned(bot.user) || Math.random() < 0.02) {
        jackal.log("I was mentioned: '" + msg.content + "'");

        if (Math.random() < 0.04) {
            msg.channel.sendMessage(msg.author + " " + sponge(msg.content));
        }

        cb.write(msg.content, response => {
            if (response && response.output) {
                msg.channel.sendMessage(msg.author + " " + response.output);
            }
        });
    } else if (Math.random() < 0.01) {
        msg.channel.sendMessage(msg.author + " " + sponge(msg.content));
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

function sponge(str) {
  var built = "";
  var div = 2;
  for (var c in str) {
    var lc = str[c].toLowerCase();
    if (Math.random() > (1 / 2)) {
      lc = lc.toUpperCase();
      div += 0.5;
    } else {
      div += 2;
    }
    
    built += lc;
  }
  
  return built;
}

let game = undefined;

function whengame(msg) {
    if (msg.isMentioned(bot.user)) {
        let re = /when (?:does|do|did|will|is) (.+) (?:come|coming|gonna be|will be)? (?:out)?/;
        let match = msg.content.toLowerCase().match(re);

        if (match) {
            jackal.log("Trying to find game " + match[1]);

            if(match[1].indexOf("destiny 2") + 1) {
                const temp = [
                    'if (strcmp(*match[1], "Destiny 2")) { printf(destiny2ReleaseDateForPC()) } else { printf(search(&match[1])) }',
                    'print(destiny2_release_date_for_pc() if match[1] == "Destiny 2" else search(match[1]))',
                    'if (match[1] === "Destiny 2") { print(destiny2ReleaseDateForPC()) } else { print(search(match[1)) }',
                    'if (match[1].equals("Destiny 2")) { System.out.println(destiny2ReleaseDateForPC()) } else { System.out.println(search(match[1)) }',
                    '(print (if (eq (index match 1) "Destiny 2") (destiny2ReleaseDateForPC) (search (index match 1))))',
                    'print (if ((snd match) = "Destiny 2") then (destiny2ReleaseDateForPC ()) else (search (snd match)))'
                ];
                const sel = Math.floor(Math.random() * temp.length);

                const msgs2 = msg.channel.sendMessage(msg.author + " " + temp[sel]);
                if (msgs2) {
                    msgs2.then(msgsg => msgsg.react(":bill_bill_bill:"));
                }
                return;
            }

            const url = "https://www.giantbomb.com/api/search?api_key=784cd4d79994d600c7fcece2c198b1b859436176&format=json&resources=game&query=" + encodeURIComponent(match[1]);
            const options = {
              url: url,
              headers: {
                'User-Agent': 'anime-was-a-mistake discord bot'
              }
            };

            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let json = JSON.parse(body);
                    if (json && json.results.length > 1) {
                        let result = json.results[0];
                        let name = result.name;
                        let dateStr = result.original_release_date;
                        if (result.expected_release_year && result.expected_release_month && result.expected_release_day) {
                            dateStr = "" + result.expected_release_year + "-" + result.expected_release_month + "-" + result.expected_release_day;
                        }

                        if (!dateStr) {
                            msg.channel.sendMessage(msg.author + " " + "I don't think '" + name + "' has a known release date yet.");
                            return;
                        } else {
                            let date = new Date(dateStr);
                            let today = new Date();

                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            const datePretty = date.toLocaleDateString("en-US", options);

                            if (date < today) {
                                msg.channel.sendMessage(msg.author + " " + "'" + name + "' already came out on " + datePretty + ".");
                            } else {
                                msg.channel.sendMessage(msg.author + " " + "'" + name + "' should come out on " + datePretty + ".");
                            }

                            return;
                        }

                        return;
                    } else {
                        jackal.log("No results for " + match[1]);
                    }
                } else {
                    console.error(error);
                    console.log(response);
                }
                msg.channel.sendMessage(msg.author + " " + "I couldn't be bothered to find the release date of '" + match[1] + "'.");
                
            });

            return true;
        }
    }

    return false;
}

bot.on("message", msg => {
    if (msg.author.bot) return; 

    if (!xkcdUrlMatch(msg)) {
        xkcdRequest(msg);
    }

    pearRequest(msg);

    if (!whengame(msg)) {
        cleverbot(msg);
    }

if (msg.content === "/exodia") {
  msg.channel.sendMessage(".\n"+
"ＨＡＨＡＨＡ   <:tidus_tl:326605903254257665><:tidus_tr:326605922682011659>\n"+
"                          \\ <:tidus_bl:326605940206075904><:tidus_br:326605948917645322>");
}

    if (msg.content && msg.content.toLowerCase && msg.content.toLowerCase() === "doot doot") {
        msg.channel.sendMessage("🎺 🎺");
    }

    if (msg.content.toLowerCase().indexOf("noot noot") + 1) {
        msg.channel.sendMessage("", { file: "http://i.imgur.com/8TX82VJ.jpg" });
    }

    if (msg.content === "/deardexter" || msg.content === "/dearme" && msg.author.username.indexOf("afrodynamics") >= 0) {
        msg.channel.sendMessage("", { file: "http://i.imgur.com/FpqoQa1.png" });
    }

    if (msg.content === "/blue") {
        msg.channel.sendMessage("", { file: "https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg" });
    }

    if (msg.content.indexOf("/losangeles") + 1) {
        msg.channel.sendMessage("", { file: "http://i.imgur.com/SHBazSF.gif" });
    }

    if (msg.content.toLowerCase().indexOf("/alexsays") + 1) {
        msg.channel.sendMessage("<:rekwah:298691352210964480> ＤＲＩＮＫＹＯＵＲＶＥＧＥＭＩＴＥ <:hawker:298689474802483201>");
    }

    if (msg.content.toLowerCase().match(/.*j+a+s+o+n+!+.*/)) {
        msg.react("🎈");
        msg.channel.send(msg.author, { reply: msg.author, file: "https://i.imgur.com/umeW9Sb.png" });
    }

    if (msg.content.toLowerCase().match(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)) {
        msg.react("😍");
        msg.channel.send(msg.author, { file: "https://i.imgur.com/VGiD6d6.png" });
    }

    try {
    const rollMatch = msg.content.match(/\/roll ([0-9d+\- ]+)(?:(?:for )(.*))?/);
    if (rollMatch && rollMatch[1]) {
        const firstNum = rollMatch[1].match(/(\d+).*(\d+)?/);
        if (firstNum && firstNum[1]) {
            if (Number(firstNum[1]) > 10000 && (!firstNum[2] || Number(firstNum[2]) > 10000)) {
                msg.channel.send(msg.author + " No.");
                return;
            }
        }


        const result = d20.roll(rollMatch[1]);
        const type = rollMatch[2] ? ("for " + rollMatch[2].trim() + " ") : "";
        if (result === 0) {
            msg.channel.send(msg.author + " rolled " + "0 " + type + "(which means you either input an incorrect roll command, or you rolled a zero somehow)");
        } else {
            msg.channel.send(msg.author + " rolled " + String(result) + " " + type);
        }
    }
    } catch (err) {
        msg.channel.send(msg.author + " please don't ");
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

app.listen(process.env.PORT || 3001, function () {
    jackal.log("App listening on port " + (process.env.PORT || 3001));
});
