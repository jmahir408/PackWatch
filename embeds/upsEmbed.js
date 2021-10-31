const { Client, Intents, Channel, MessageEmbed } = require("discord.js");

//base embed variable with some constant stuff
let embed = new MessageEmbed()
  .setAuthor(
    "PackWatch",
    // "https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg",
    "https://cdn.discordapp.com/attachments/898312487974367242/904293977325469706/easy.webp",
    "https://bajablast.live"
  )
  .setThumbnail(
    "https://cdn.discordapp.com/attachments/898312487974367242/904293977325469706/easy.webp"
  )
  .setTimestamp()
  .setFooter(
    "Made by Guru and Mahir",
    "https://cdn.discordapp.com/attachments/898312487974367242/904293977325469706/easy.webp"
  );

//embed functions that change base design of embed by adding URL, color, fields
//base command (!ups <trackingNumber>)
createInvalidPackageEmbed = (url, trackingNumber) => {
  embed.setURL(url);
  embed.setColor("#ff1100");
  embed.addFields(
    { name: "Tracking Status", value: "Invalid tracking id!" },
    { name: "Requested Tracking Number", value: trackingNumber }
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
        { name: "Tracking Status", value: `ETA: ${line}` },
        { name: "Requested Tracking Number", value: trackingNumber }
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
        { name: "Tracking Status", value: `Delivered on: ${line}` },
        { name: "Requested Tracking Number", value: trackingNumber }
      );
    });
  return embed;
};

createCheckBackLaterEmbed = (url, trackingNumber, status) => {
  status[2]
    .toString()
    .split("\n")
    .forEach((line) => {
      embed.setURL(url);
      embed.setColor("#FFA500");
      embed.addFields(
        { name: "Tracking Status", value: line },
        { name: "Requested Tracking Number", value: trackingNumber }
      );
    });
  return embed;
};

//custom commands (!ups track <item>)
createCustomEtaPackageEmbed = (
  url,
  trackingNumber,
  status,
  item,
  timestamp
) => {
  status[0]
    .toString()
    .split("\n")
    .forEach((line) => {
      embed.setTitle(`UPS - ${item}`);
      embed.setURL(url);
      embed.setColor("#FFFF00");
      embed.addFields(
        { name: "Tracking Status", value: `ETA: ${line}` },
		{ name: "Item", value: item },
		{ name: "Requested Tracking Number", value: trackingNumber },
        { name: "Saved on", value: timestamp }
      );
    });
  return embed;
};

createCustomDeliveredPackageEmbed = (
  url,
  trackingNumber,
  status,
  item,
  timestamp
) => {
  status[1]
    .toString()
    .split("\n")
    .forEach((line) => {
      embed.setTitle(`UPS - ${item}`);
      embed.setURL(url);
      embed.setColor("#00ff00");
      embed.addFields(
		{ name: "Tracking Status", value: `Delivered on: ${line}` },
        { name: "Item", value: item },
        { name: "Requested Tracking Number", value: trackingNumber },
        { name: "Saved on", value: timestamp }
      );
    });
  return embed;
};

createCustomCheckBackLaterEmbed = (
  url,
  trackingNumber,
  status,
  item,
  timestamp
) => {
  status[2]
    .toString()
    .split("\n")
    .forEach((line) => {
      embed.setTitle(`UPS - ${item}`);
      embed.setURL(url);
      embed.setColor("#FFA500");
      embed.addFields(
		{ name: "Tracking Status", value: line },
        { name: "Item", value: item },
        { name: "Requested Tracking Number", value: trackingNumber },
        { name: "Saved on", value: timestamp }
      );
    });
  return embed;
};

//export embed functions for use in bot file
module.exports = {
  createInvalidPackageEmbed,
  createEtaPackageEmbed,
  createDeliveredPackageEmbed,
  createCheckBackLaterEmbed,
  createCustomEtaPackageEmbed,
  createCustomDeliveredPackageEmbed,
  createCustomCheckBackLaterEmbed,
};
