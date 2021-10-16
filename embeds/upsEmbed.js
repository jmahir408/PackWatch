
const { Client, Intents, Channel, MessageEmbed } = require("discord.js");

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
		  { name: "Requested Tracking Number", value: trackingNumber },
		  { name: "Tracking Status", value: `Delivered on: ${line}` }
		);
	  });
	return embed;
  };

module.exports = {
	createInvalidPackageEmbed,
	createEtaPackageEmbed,
	createDeliveredPackageEmbed
};