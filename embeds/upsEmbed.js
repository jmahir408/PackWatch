
const { Client, Intents, Channel, MessageEmbed } = require("discord.js");

//base embed variable with some constant stuff
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

//embed functions that change base design of embed by adding URL, color, fields
createInvalidPackageEmbed = (url, trackingNumber) => {
	embed.setURL(url);
	embed.setColor("#ff1100");
	embed.addFields(
	  { name: "Requested Tracking Number", value: trackingNumber },
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
		  { name: "Requested Tracking Number", value: trackingNumber },
		  { name: "Tracking Status", value: `ETA: ${line}` },
		);
	  });
	return embed;
  };

  createDeliveredPackageEmbed = (url, trackingNumber, status, item, timestamp) => {
	status[1]
	  .toString()
	  .split("\n")
		.forEach((line) => {
			embed.setTitle("Package Information")
			embed.setColor("#0099ff")
		embed.setURL(url);
		embed.setColor("#00ff00");
		embed.addFields(
		  { name: "Requested Tracking Number", value: trackingNumber },
			{ name: "Tracking Status", value: `Delivered on: ${line}` },
			{ name: "Item", value: item },
			 {name: "Added to DB on", value: timestamp}
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
		  { name: "Requested Tracking Number", value: trackingNumber },
		  { name: "Tracking Status", value: line }
		);
	  });
	return embed;
  };

//export embed functions for use in bot file
module.exports = {
	createInvalidPackageEmbed,
	createEtaPackageEmbed,
	createDeliveredPackageEmbed,
	createCheckBackLaterEmbed
};