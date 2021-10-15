
const { Client, Intents, Channel, MessageEmbed } = require("discord.js");

const embed = new MessageEmbed()
	.setColor('#0099ff')
  .setTitle('Insert user created package Name')
  //Insert UPS Tracking Page link
	.setURL('https://discord.js.org/')
	.setAuthor('PackWatch', 'https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg', 'https://discord.js.org')
	.setDescription('Insert Tracking ID')
	.setThumbnail('https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg')
	.addFields(
		{ name: 'Tracking Status', value: 'Insert status here' },
	)
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter('Made by Guru and Mahir', 'https://static.vecteezy.com/system/resources/previews/000/350/131/original/vector-package-icon.jpg');
module.exports.embed = embed;