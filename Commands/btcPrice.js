module.exports = {
  name: "btc",
  description: "Repete tudo o que você disser.",

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
      message.reply(":money_with_wings:  **Preço Atualizado do Bitcoin** :money_with_wings: \n\n" +
        `:flag_br: **BRL:** R$ ${valorBRL}\n` +
        `:flag_us: **USD:** $ ${valorUSDT}\n\n` +
        "_*Os valores são baseados nas taxas mais recentes da Binance._");
    }
    sendMessage();
  }
};
