module.exports = {
  name: "price",
  description: `Exibe o valor da criptomoeda.`,  

  async execute(message) {
    // Extrai o nome da criptomoeda após o comando
    const cryptoName = message.content.trim().split(/\s+/).slice(1).join(" ").toUpperCase();

    // Função para obter o valor em USDT
    async function getCryptoUsdt() {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptoName}USDT`);
        const data = await response.json();

        // Verifica se a resposta contém o preço
        if (data.price > 0.01) {
          return parseFloat(data.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (data.price < 0.01) {
          return parseFloat(data.price)
        }
        
      } catch (error) {
        console.error("Erro ao buscar USDT:", error);
        return null; // Retorna null em caso de erro
      }
    }

    // Função para obter o valor em BRL
    async function getCryptoBrl() {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptoName}BRL`);
        const data = await response.json();

        // Verifica se a resposta contém o preço
        if (data.price >= 0.01) {
          return parseFloat(data.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (data.price <= 0.01) {
          return parseFloat(data.price)
        }
      } catch (error) {
        console.error("Erro ao buscar BRL:", error);
        return null; // Retorna null em caso de erro
      }
    }

    // Função para enviar a resposta
    async function sendMessage() {
      const valorUSDT = await getCryptoUsdt();
      const valorBRL = await getCryptoBrl();

      // Verifica se os valores foram encontrados e são válidos
      let valoresPresentes = 0;

      if (valorUSDT) valoresPresentes++;  // Se valorUSDT existir, soma 1
      if (valorBRL) valoresPresentes++;   // Se valorBRL existir, soma 1
      
      switch (valoresPresentes) {
        case 2:
          message.reply(
            `📢 **Preço Atualizado do ${cryptoName}** 🚀\n\n` +
            `:flag_br: **BRL:** \`R$ ${valorBRL}\`\n` +
            `:flag_us: **USD:** \`$ ${valorUSDT}\`\n\n` +
            "📊_*Os valores são baseados nas taxas mais recentes da Binance._"
          );
          break;
        
        case 1:
          if (valorUSDT) {
            message.reply(
              `📢 **Preço Atualizado do ${cryptoName}** 🚀\n\n` +
              `:flag_us: **USD:** \`$ ${valorUSDT}\`\n\n` +
              "📊_*Os valores são baseados nas taxas mais recentes da Binance._"
            );
          } else if (valorBRL) {
            message.reply(
              `📢 **Preço Atualizado do ${cryptoName}** 🚀\n\n` +
              `:flag_br: **BRL:** \`R$ ${valorBRL}\`\n\n` +
              "📊_*Os valores são baseados nas taxas mais recentes da Binance._"
            );
          }
          break;
      
        case 0:
          message.reply("❌ **Valores não encontrados para a criptomoeda.**");
          break;
      
        default:
          message.reply("❌ **Erro desconhecido.**");
          break;
      }
    }
    sendMessage();
  }
};
