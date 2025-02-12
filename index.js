require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch'); // Para fazer a requisição ao preço do BTC

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot ${client.user.tag} está online!`);

    // Canal onde as mensagens serão enviadas
    const channelID = '1337277040771989556'; // Substitua pelo ID do canal desejado
    const channel = client.channels.cache.get(channelID);

    if (!channel) {
        console.error("Canal não encontrado. Verifique o ID do canal.");
        return;
    }

    // Função que busca o preço do BTC em USDT e BRL e envia para o canal
    async function fetchBTCPrice() {
        try {
            // Buscando o preço em USDT
            const responseUSDT = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
            const dataUSDT = await responseUSDT.json();

            // Buscando o preço em BRL
            const responseBRL = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL");
            const dataBRL = await responseBRL.json();

            if (dataUSDT.price && dataBRL.price) {
                const priceUSDT = parseFloat(dataUSDT.price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });

                const priceBRL = parseFloat(dataBRL.price).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });

                // Envia os preços do BTC em USDT e BRL para o canal
                channel.send(
                    `@everyone\n\n` +
                    `📢 **Preço Atualizado do Bitcoin** 🚀\n\n` +
                    `:flag_br: **BRL:** \`R$ ${priceBRL}\`\n` +
                    `:flag_us: **USD:** \`$ ${priceUSDT}\`\n\n` +
                    "📊_*Os valores são baseados nas taxas mais recentes da Binance._"
                );
            } else {
                console.error("Erro ao buscar os preços do BTC.");
            }
        } catch (error) {
            console.error("Erro ao acessar a API da Binance:", error);
        }
    }

    // Envia o primeiro alerta assim que o bot for online
    fetchBTCPrice();

    // Envia alertas a cada 1 hora (3600000 ms)
    setInterval(fetchBTCPrice, 3600000); // 1 hora
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
