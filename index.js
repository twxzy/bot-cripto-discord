require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Criar coleção de comandos
client.commands = new Collection();

// Carregar automaticamente todos os comandos da pasta "commands"
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`✅ Bot ${client.user.tag} está online!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).split(/ +/); // Remove "!" e divide os argumentos
    const commandName = args.shift().toLowerCase(); // Pega o nome do comando

    const command = client.commands.get(commandName);
    if (command) {
        command.execute(message, args);
    }
});

client.login(process.env.TOKEN);
