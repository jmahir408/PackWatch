
const { Client, Intents, Channel, MessageEmbed } = require("discord.js");

//base embed variable with some constant stuff
let embed = new MessageEmbed()
	// .setTitle("UPS - userObjectName")
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
createInvalidPackageEmbed = (url, trackingNumber) => {
	embed.setURL(url);
	embed.setColor("#ff1100");
	embed.addFields(
		{ name: "Requested Tracking Number", value: trackingNumber },
		{ name: "Tracking Status", value: "Invalid tracking id!" }
	);
	return embed;
};

createEtaPackageEmbed = (url, trackingNumber, status, item, timestamp) => {
	status[0]
		.toString()
		.split("\n")
		.forEach((line) => {
			embed.setTitle(`UPS - ${item}`);
			embed.setURL(url);
			embed.setColor("#FFFF00");
			embed.addFields(
				{ name: "Item", value: item },
				{ name: "Requested Tracking Number", value: trackingNumber },
				{ name: "Tracking Status", value: `ETA: ${line}` },
				{ name: "Added to DB on", value: timestamp }
			);
		});
	return embed;
};

createDeliveredPackageEmbed = (url, trackingNumber, status, item, timestamp) => {
	status[1]
		.toString()
		.split("\n")
		.forEach((line) => {
			// embed.setTitle("Package Information")
			// embed.setColor("#0099ff")
			embed.setTitle(`UPS - ${item}`);
			embed.setURL(url);
			embed.setColor("#00ff00");
			embed.addFields(
				{ name: "Item", value: item },
				{ name: "Requested Tracking Number", value: trackingNumber },
				{ name: "Tracking Status", value: `Delivered on: ${line}` },
				{ name: "Added to DB on", value: timestamp }
			);
		});
	return embed;
};

createCheckBackLaterEmbed = (url, trackingNumber, status, item, timestamp) => {
	status[2]
		.toString()
		.split("\n")
		.forEach((line) => {
			embed.setTitle(`UPS - ${item}`);
			embed.setURL(url);
			embed.setColor("#FFA500");
			embed.addFields(
				{ name: "Item", value: item },
				{ name: "Requested Tracking Number", value: trackingNumber },
				{ name: "Tracking Status", value: line },
				{ name: "Added to DB on", value: timestamp }
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