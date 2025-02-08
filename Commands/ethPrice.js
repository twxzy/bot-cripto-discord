module.exports = {
  name: "eth",
  description: "Exibe o valor do Ethereum.",

  execute(message) {

    async function getEthereumUsdt() {
      //API ETH USDT
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
      const data = await response.json();
      return  parseFloat(data.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    async function getEthereumBrl() {
      //API ETH BRL
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHBRL');
      const data = await response.json();
      return  parseFloat(data.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    async function sendMessage() {
      const valorUSDT = await getEthereumUsdt();
      const valorBRL = await getEthereumBrl();
      
       //EXIBIÇÃO DO BOT
      message.reply(":money_with_wings:  **Preço Atualizado do Ethereum** :money_with_wings: \n\n" +
        `:flag_br: **BRL:** R$ ${valorBRL}\n` +
        `:flag_us: **USD:** $ ${valorUSDT}\n\n` +
        "_*Os valores são baseados nas taxas mais recentes da Binance._");
    }
    sendMessage();
  }
};