const { Client, Intents, Channel } = require('discord.js')
require('dotenv').config()
const token = process.env.BOT_TOKEN


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const prefix = '!';
// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })
  

  client.on('message', msg => { // Message function
    if (msg.author.bot) return; // Ignore all bots
    if (msg.content.startsWith(prefix)) return; // It always has to starts with the prefix which is '!'
 
    if (msg.content.startsWith(prefix + "ping")) { // When a player does '!ping'
      msg.channel.send("Pong!") // The bot will say @Author, Pong!
    }
 });
// Login to Discord with your client's token
client.login(token);