require("dotenv").config();

const { Client, Intents, Channel } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES",  "GUILD_MEMBERS"] });
const token = process.env.BOT_TOKEN;

const settings = require("./settings.json");
const ups = require('./sites/ups.js')

client.once("ready", () => {
  console.log("Ready!");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async(message) => {
  if (message.content.startsWith(settings.prefix + "ping")) {
    message.reply('pong');
  }
});

client.on('message', async(message) => {
  if (message.content.startsWith(settings.prefix + "ups")) {
    let trackingNumber = message.content.split(" ")[1];
    message.reply("Fetching your package's Estimated Time of Arrival...");
    let result = await ups.scrape(trackingNumber);
    result.toString().split("\n").forEach(line => {
      message.reply("ETA: " + line);
    });
  }
});

client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
  client.user.setActivity("Watching Packages!", {type: "PLAYING"});
});

client.login(token);