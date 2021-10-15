require("dotenv").config();

const { Client, Intents, Channel } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES",  "GUILD_MEMBERS"] });
const token = process.env.BOT_TOKEN;

const settings = require("./config/settings.json");
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
    message.reply("Fetching package info...");
    let status = await ups.scrape(trackingNumber);
    if (status == "Invalid tracking id!") {
      message.reply(status);
    } else if (status[0] == "No information found") {
      message.reply("No information found");
    } else if (status[0] != undefined && status[1] == undefined) {
      status[0].toString().split("\n").forEach(line => {
        message.reply("ETA: " + line);
      });
    } else if (status[0] == undefined && status[1] != undefined) {
      status[1].toString().split("\n").forEach(line => {
        message.reply("Delivered on: " + line);
      });
  }};
});

client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
  client.user.setActivity("Watching Packages!", {type: "PLAYING"});
});

client.login(token);