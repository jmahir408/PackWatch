require("dotenv").config();
const { Client, Intents, Channel } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES",  "GUILD_MEMBERS"] });
const settings = require("./settings.json");
client.once("ready", () => {
  console.log("Ready!");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async(message) => {
  if (message.content.startsWith(settings.prefix + "ping")) {
    message.reply('pong');
  }
});

client.on("ready", async () => {
  //Log Bot's username and the amount of servers its in to console
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

  //Set the Presence of the bot user
  client.user.setActivity("My Code", {type: "PLAYING"});
});

client.login(token);