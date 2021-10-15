require("dotenv").config();

const { Client, Intents, Channel, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
const token = process.env.BOT_TOKEN;

const settings = require("./config/settings.json");
const ups = require("./sites/ups.js");

// const embed = require('./embed.js');
let embed = new MessageEmbed()
  .setTitle("UPS - userObjectName")
  .setAuthor(
    "PackWatch",
    "https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg",
    "https://bajablast.live"
  )
  .setThumbnail(
    "https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg"
  )
  .setTimestamp()
  .setFooter(
    "Made by Guru and Mahir",
    "https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg"
  );

createInvalidPackageEmbed = (url, trackingNumber) => {
  embed.setURL(url);
  embed.setColor("#ff1100");
  embed.addFields(
    { name: "Requested tracking number", value: trackingNumber },
    { name: "Tracking Status", value: "Invalid tracking id!" }
  );
  return embed;
};

createEtaPackageEmbed = (url, trackingNumber, status) => {
  status[0]
    .toString()
    .split("\n")
    .forEach((line) => {
      embed.setURL(url);
      embed.setColor("#FFFF00");
      embed.addFields(
        { name: "Requested tracking number", value: trackingNumber },
        { name: "Tracking Status", value: `ETA: ${line}` }
      );
    });
  return embed;
};
createDeliveredPackageEmbed = (url, trackingNumber, status) => {
  status[1]
    .toString()
    .split("\n")
    .forEach((line) => {
      embed.setURL(url);
      embed.setColor("#00ff00");
      embed.addFields(
        { name: "Requested tracking number", value: trackingNumber },
        { name: "Tracking Status", value: `Delivered on: ${line}` }
      );
    });
  return embed;
};

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
      createInvalidPackageEmbed(url, trackingNumber);
      message.reply({ embeds: [embed] });
      embed.fields = [];
    } else if (status[0] == "No information found") {
      message.reply("No information found");
    } else if (status[0] != undefined && status[1] == undefined) {
      createEtaPackageEmbed(url, trackingNumber, status);
      message.reply({ embeds: [embed] });
      embed.fields = [];
    } else if (status[0] == undefined && status[1] != undefined) {
      createDeliveredPackageEmbed(url, trackingNumber, status);
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
