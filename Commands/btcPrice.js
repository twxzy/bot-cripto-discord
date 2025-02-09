module.exports = {
  name: "btc",
  description: "Exibe o valor do bitcoin.",

  execute(message) {

    async function getBitcoinUsdt() {
      //API BTC USDT
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
      const data = await response.json();
      return  parseFloat(data.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    async function getBitcoinBrl() {
      //API BTC BRL
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL');
      const data = await response.json();
      return  parseFloat(data.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    async function sendMessage() {
      const valorUSDT = await getBitcoinUsdt();
      const valorBRL = await getBitcoinBrl();
      
       //EXIBIÇÃO DO BOT
       message.reply(
        "📢 **Preço Atualizado do Bitcoin** 🚀\n\n" +
        `:flag_br: **BRL:** \`R$ ${valorBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`\n` +
        `:flag_us: **USD:** \`$ ${valorUSDT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`\n\n` +
        "📊_*Os valores são baseados nas taxas mais recentes da Binance._"
      );      
    }
    sendMessage();
  }
};
