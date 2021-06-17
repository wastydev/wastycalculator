const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const {prefix, token } = require("./config.json")

const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: true
});

require('discord-buttons')(client)

client.commands = new Collection();
client.aliases = new Collection();



["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`${client.user.username} adlı botumuz aktif.`);

    client.user.setPresence("discord.gg/wasty") 
})

client.on("message", async message => {


    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args);
});


client.login("token");