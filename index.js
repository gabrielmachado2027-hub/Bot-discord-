const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let banca = 1000;
let apostaAtual = null;

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;

  const content = msg.content.toLowerCase();

  if (content.startsWith("!apostar")) {
    let partes = content.split(" ");
    let valor = parseFloat(partes[1]);
    let odd = parseFloat(partes[2]);

    apostaAtual = { valor, odd };
    msg.reply("🎯 Aposta registrada! Use !green ou !red");
  }

  if (content === "!green") {
    if (!apostaAtual) return msg.reply("❌ Nenhuma aposta!");

    let lucro = (apostaAtual.valor * apostaAtual.odd) - apostaAtual.valor;
    banca += lucro;

    apostaAtual = null;

    msg.reply(`✅ GREEN | Banca: ${banca}`);
  }

  if (content === "!red") {
    if (!apostaAtual) return msg.reply("❌ Nenhuma aposta!");

    banca -= apostaAtual.valor;
    apostaAtual = null;

    msg.reply(`❌ RED | Banca: ${banca}`);
  }

  if (content === "!banca") {
    msg.reply(`📊 Banca: ${banca}`);
  }
});

client.login(process.env.TOKEN);
