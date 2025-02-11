module.exports = {
  name: "calc",
  description: "",
  
  execute(message) {
    
    async function getCrypto() {
      const cryptoName = message.content.trim().split(/\s+/).slice(1,2).join(" ").toUpperCase();
      const moneyName = message.content.trim().split(/\s+/).slice(3,4).join(" ").toUpperCase();

      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptoName}${moneyName}`);
      const data = await response.json();

      return parseFloat(data.price);
    }

    async function sendMessage() {
      const valor = await getCrypto();
      const moneyValor = parseFloat(message.content.trim().split(/\s+/).slice(2,3).join(" "));
      const moneyName = message.content.trim().split(/\s+/).slice(3,4).join(" ").toUpperCase();
      const cryptoName = message.content.trim().split(/\s+/).slice(1,2).join(" ").toUpperCase();

      if (isNaN(valor) || isNaN(moneyValor)) {
        return message.reply("Erro ao obter os valores. Verifique se os dados estão corretos.");
      }

      // Formatando os valores corretamente
      let valorCrypto = valor >= 1 
        ? valor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : valor.toFixed(8);

      let valorCalc = (moneyValor / valor);
      valorCalc = valorCalc >= 1 
        ? valorCalc.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : valorCalc.toFixed(8);

      if (moneyName === 'USDT') {
        message.reply(
          `📢 **Conversão de ${cryptoName} Atualizado** 🚀\n\n` +
          `💰 Com o preço do **${cryptoName}** cotado a \`$ ${valorCrypto}\`, ` +
          `você pode comprar aproximadamente \`${valorCalc} ${cryptoName}\` com \`$ ${moneyValor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`.\n\n` +
          `📊_*Os valores são baseados nas taxas mais recentes da Binance._*`
        );
      }
      if (moneyName === 'BRL') {
        message.reply(
          `📢 **Conversão de ${cryptoName} Atualizado** 🚀\n\n` +
          `💰 Com o preço do **${cryptoName}** cotado a \`R$ ${valorCrypto}\`, ` +
          `você pode comprar aproximadamente \`${valorCalc} ${cryptoName}\` com \`R$ ${moneyValor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`.\n\n` +
          `📊_*Os valores são baseados nas taxas mais recentes da Binance._*`
        );
      }
    }

    sendMessage();
  }
}
