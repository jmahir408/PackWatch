require("dotenv").config();

const { Client, Intents, Channel, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
const token = process.env.BOT_TOKEN;

const settings = require("./config/settings");
const ups = require("./sites/ups");
require('./embeds/upsEmbed');

client.once("ready", () => {
  console.log("Ready!");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content.startsWith(settings.prefix + "ping")) {
    message.reply("pong");
  }
});

client.on("message", async (message) => {
  if (message.content.startsWith(settings.prefix + "ups")) {
    let trackingNumber = message.content.split(" ")[1];
    let url =
      "https://www.ups.com/WebTracking?loc=en_US&Requester=DAN&tracknum=";
    url += trackingNumber;
    message.reply("Fetching package info...");
    let status = await ups.scrape(trackingNumber);
    if (status == "Invalid tracking id!") {
      let embed = createInvalidPackageEmbed(url, trackingNumber);
      message.reply({ embeds: [embed] });
      embed.fields = [];
    } else if (status[0] == "No information found") {
      message.reply("No information found");
    } else if (status[0] != undefined && status[1] == undefined) {
      let embed = createEtaPackageEmbed(url, trackingNumber, status);
      message.reply({ embeds: [embed] });
      embed.fields = [];
    } else if (status[0] == undefined && status[1] != undefined) {
      let embed = createDeliveredPackageEmbed(url, trackingNumber, status);
      message.reply({ embeds: [embed] });
      embed.fields = [];
    }
  }
});

client.on("ready", async () => {
  console.log(
    `${client.user.username} is online on ${client.guilds.cache.size} servers!`
  );
  client.user.setActivity("Watching Packages!", { type: "PLAYING" });
});

client.login(token);
