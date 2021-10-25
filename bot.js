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
require("./embeds/upsEmbed");
const upsDB = require("./models/ups");

//connecting to mongoDB
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const createUser = async (message) => {
  try {
    const user = await upsDB.findOne({ id: message.author.id });
    if (user) {
      // console.log("User exists");
    } else {
      // console.log("User does not exist");
      await upsDB.create({
        id: message.author.id,
        username: message.author.username,
        discriminator: message.author.discriminator,
        tag: message.author.tag,
        avatar: message.author.avatar,
        avatarURL: message.author.avatarURL(),
        authorCreatedAt: message.author.createdAt.toLocaleString(),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const addPackage = async (message, trackingNumber, item) => {
  await upsDB.findOneAndUpdate(
    { id: message.author.id },
    {
      $push: {
        packages: [
          {
            trackingNumber: trackingNumber,
            item: item,
            timestamp: message.createdAt.toLocaleString(),
          },
        ],
      },
    }
  );
};

const deletePackage = async (message, item) => {
  await upsDB.findOneAndUpdate(
    { id: message.author.id },
    {
      $pull: {
        packages: {
          item: item
        }
      }
    }
  );
};

//get package by name in packages array
const getPackage = async (message, item) => {
  try {
    const user = await upsDB.findOne({ id: message.author.id });
    if (user) {
      const package = user.packages.find((p) => p.item === item);
      if (package) {
        return package;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const handleStandardCommand = async (message) => {
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
  const package = await getPackage(message, item)
  let trackingNumber = package.trackingNumber;
  let url =
      "https://www.ups.com/WebTracking?loc=en_US&Requester=DAN&tracknum=";
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

client.on("message", async (message) => {
  if (message.content.startsWith(settings.prefix + "ups")) {
    createUser(message);
    if (message.content.includes("add")) {
      let trackingNumber = message.content.split(" ")[2];
      let item = message.content.split(" ")[3];
      addPackage(message, trackingNumber, item);
      message.reply("Package Added to Database.");
    } else if (message.content.includes("track")) {
      handleCustomCommand(message);
    } else if (message.content.includes("delete")) {
      let item = message.content.split(" ")[2];
      deletePackage(message, item);
      message.reply("Package Deleted from Database");
    } else if (message.content.includes("info")) {
      let item = message.content.split(" ")[2];
      const package = await getPackage(message, item)
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
