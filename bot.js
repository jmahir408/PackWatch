require("dotenv").config();
const { Client, Intents, Channel, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
const token = process.env.BOT_TOKEN;

const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

const settings = require("./config/settings");
const ups = require("./sites/ups");

//get embed functions
require("./embeds/upsEmbed");

const UpsDB = require("./database/UpsDB");
const upsDB = new UpsDB();

//connecting to mongoDB
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Main Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const handleStandardCommand = async (message) => {
  let trackingNumber = message.content.split(" ")[1];
  let url = "https://www.ups.com/WebTracking?loc=en_US&Requester=DAN&tracknum=";
  url += trackingNumber;
  message.reply("Fetching package info...");
  let status = await ups.scrape(trackingNumber);
  if (status == "Invalid tracking id!") {
    let embed = createInvalidPackageEmbed(url, trackingNumber);
    message.reply({ embeds: [embed] });
    embed.fields = [];
  } else if (
    status[2] == "Check back tomorrow for an updated delivery date." &&
    status[0] == undefined &&
    status[1] == undefined
  ) {
    let embed = createCheckBackLaterEmbed(url, trackingNumber, status);
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
};

const handleCustomCommand = async (message) => {
  let item = message.content.split(" ")[2];
  const package = await upsDB.getPackage(message, item);
  let trackingNumber = package.trackingNumber;
  let timestamp = package.timestamp;
  let url = "https://www.ups.com/WebTracking?loc=en_US&Requester=DAN&tracknum=";
  url += trackingNumber;
  message.reply("Fetching package info...");
  let status = await ups.scrape(trackingNumber);
  if (status == "Invalid tracking id!") {
    let embed = createInvalidPackageEmbed(url, trackingNumber);
    message.reply({ embeds: [embed] });
    embed.fields = [];
  } else if (
    status[2] == "Check back tomorrow for an updated delivery date." &&
    status[0] == undefined &&
    status[1] == undefined
  ) {
    let embed = createCheckBackLaterEmbed(url, trackingNumber, status);
    message.reply({ embeds: [embed] });
    embed.fields = [];
  } else if (status[0] == "No information found") {
    message.reply("No information found");
  } else if (status[0] != undefined && status[1] == undefined) {
    let embed = createEtaPackageEmbed(url, trackingNumber, status);
    message.reply({ embeds: [embed] });
    embed.fields = [];
  } else if (status[0] == undefined && status[1] != undefined) {
    let embed = createDeliveredPackageEmbed(url, trackingNumber, status, item, timestamp);
    message.reply({ embeds: [embed] });
    embed.fields = [];
  }
};

//replies with embed with all packages from listPackages function
const handleListCommand = async (message) => {
  const embed = await upsDB.listPackages(message);
  message.reply({ embeds: [embed] });
  embed.fields = [];
};

//log
client.once("ready", () => {
  console.log("Ready!");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//ping command
client.on("message", async (message) => {
  if (message.content.startsWith(settings.prefix + "ping")) {
    message.reply("pong");
  }
});

//user information command
client.on("message", async (message) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.content.startsWith(settings.prefix + "info")) {
    const embed = new MessageEmbed()
      .setTitle("User Information")
      .setColor("#0099ff")
      .setThumbnail(message.author.avatarURL())
      .addField("User ID", message.author.id)
      .addField("Username", message.author.username)
      .addField("Discriminator", message.author.discriminator)
      .addField("Tag", message.author.tag)
      .addField("Avatar Hash", message.author.avatar)
      .addField("Avatar URL", message.author.avatarURL())
      .addField("Message sent at", message.createdAt.toLocaleString())
      .addField(
        "Account Created At",
        message.author.createdAt.toLocaleString()
      );
    message.channel.send({ embeds: [embed] });
  }
});

//main message event handler
client.on("message", async (message) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.content.startsWith(settings.prefix + "ups")) {
    upsDB.createUser(message);
    if (message.content.includes("add")) {
      let trackingNumber = message.content.split(" ")[3];
      let item = message.content.split(" ")[2];
      upsDB.addPackage(message, trackingNumber, item);
      message.reply("Package Added to Database.");
    } else if (message.content.includes("track")) {
      //have track do info also 
      handleCustomCommand(message);
      // let item = message.content.split(" ")[2];
      // const package = await upsDB.getPackage(message, item);
      // const embed = new MessageEmbed()
      //   .setTitle("Package Information")
      //   .setColor("#0099ff")
      //   .setThumbnail(message.author.avatarURL())
      //   .addField("Tracking Number", package.trackingNumber)
      //   .addField("Item", package.item)
      //   .addField("Added to DB on", package.timestamp);
      // message.channel.send({ embeds: [embed] });
    } else if (message.content.includes("delete")) {
      let item = message.content.split(" ")[2];
      upsDB.deletePackage(message, item);
      message.reply("Package Deleted from Database");
    } else if (message.content.includes("list")) {
      //just need to pass in message for message.author.id, no other command needed
      handleListCommand(message);
    } else if (message.content.includes("info")) {
      let item = message.content.split(" ")[2];
      const package = await upsDB.getPackage(message, item);
      const embed = new MessageEmbed()
        .setTitle("Package Information")
        .setColor("#0099ff")
        .setThumbnail(message.author.avatarURL())
        .addField("Tracking Number", package.trackingNumber)
        .addField("Item", package.item)
        .addField("Added to DB on", package.timestamp);
      message.channel.send({ embeds: [embed] });
    } else {
      handleStandardCommand(message);
    }
  }
});

client.on("ready", async () => {
  console.log(
    `${client.user.username} is online on ${client.guilds.cache.size} servers!`
  );
  client.user.setActivity("Packages!", { type: "WATCHING" });
});

client.login(token);
