module.exports = {
  name: "btc-calc",
  description: "Calcula quantos btc você conseguiria comprar.",

  execute(message) {

    async function getBitcoinUsdt() {
      //API BTC USDT
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
      const data = await response.json();
      return  parseFloat(data.price)
    }
    
    async function getBitcoinBrl() {
      //API BTC BRL
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL');
      const data = await response.json();
      return  parseFloat(data.price)
    }

    async function sendMessage() {
      const valorUSDT = await getBitcoinUsdt();
      const valorBRL = await getBitcoinBrl();
      const valorDigitado = message.content.split(' ')[1]
      //!btc calac 1000 USDT (salva o 'USDT')
      const moeda = `${String(valorDigitado.toUpperCase().replace(/\d+/g, ''))}`
      //!btc calac 1000 USDT (salva o '1000')
      const valor = `${Number(parseInt(valorDigitado.replace(/\D+/g, '')))}`

      //Divide o valor digitado pelo preço do BTC
      const calcUSDT = valor / valorUSDT
      const calcBRL = valor / valorBRL

      //Se o valor for digitado em USDT ele entrega o calculo em USDT
      const mensagemUSDT = 
      `📢 **Cotação Atual do Bitcoin** 🚀\n\n` +
      `💰 **Preço:** \`$ ${valorUSDT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT\`\n` +
      `💵 **Investimento:** \`${Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT\`\n` +
      `🔸 **Bitcoin Recebido:** \`${calcUSDT.toFixed(8)} BTC\`\n` +
      `⚡ **Satoshis:** \`${Math.round(calcUSDT * 100000000).toLocaleString()}\`\n\n` +
      `📊 *Valores atualizados com base nas taxas mais recentes da Binance.*`;

      //Se o valor for digitado em BRL ele entrega o calculo em BRL
      const mensagemBRL = 
      `📢 **Cotação Atual do Bitcoin** 🚀\n\n` +
      `💰 **Preço:** \`R$ ${valorBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BRL\`\n` +
      `💵 **Investimento:** \`R$ ${Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BRL\`\n` +
      `🔸 **Bitcoin Recebido:** \`₿ ${calcBRL.toFixed(8)} BTC\`\n` +
      `⚡ **Satoshis:** \`₿ ${Math.round(calcBRL * 100000000).toLocaleString()}\`\n\n` +
      `📊 *Valores atualizados com base nas taxas mais recentes da Binance.*`;

      //Exibe de acordo com o valor digitado USDT ou BRL
      if(moeda == 'USDT'){
        message.reply(`${mensagemUSDT}`)
      } else if(moeda == 'BRL'){
        message.reply(`${mensagemBRL}`)
      }
    }
    sendMessage();
  }
};
