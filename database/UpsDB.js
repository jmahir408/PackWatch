require("dotenv").config();

const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
const upsModel = require("../models/ups");

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Functions Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = class UpsDB {
  createUser = async (message) => {
    try {
      const user = await upsModel.findOne({ id: message.author.id });
      if (user) {
        // console.log("User exists");
      } else {
        // console.log("User does not exist");
        await upsModel.create({
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

  addPackage = async (message, trackingNumber, item) => {
    await upsModel.findOneAndUpdate(
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

  deletePackage = async (message, item) => {
    await upsModel.findOneAndUpdate(
      { id: message.author.id },
      {
        $pull: {
          packages: {
            item: item,
          },
        },
      }
    );
  };

  //get package by name in packages array
  getPackage = async (message, item) => {
    try {
      const user = await upsModel.findOne({ id: message.author.id });
      if (user) {
        const s = user.packages.find((p) => p.item === item);
        if (s) {
          return s;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  listPackages = async (message) => {
    try {
      const user = await upsModel.findOne({ id: message.author.id });
      if (user) {
        const packages = user.packages;
        if (packages.length > 0) {
          const embed = new MessageEmbed()
            .setTitle("Packages")
            .setColor("#0099ff")
            .setThumbnail(message.author.avatarURL());
          packages.forEach((p) => {
            embed.addField(
              `${p.item}`,
              `Tracking Number: ${p.trackingNumber}\nSaved on: ${p.timestamp}`
            );
          });
          return embed;
        } else {
          const embed = new MessageEmbed()
            .setTitle("Packages")
            .setColor("#0099ff")
            .setThumbnail(message.author.avatarURL())
            .setDescription("You have no packages!");
          return embed;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};
