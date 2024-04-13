const axios = require("axios");

module.exports = (bot) => {
  bot.command("history", async (ctx) => {
    const text = ctx.message.text;
    const regex = /\/history\s+(.+)/;
    const result = text.match(regex);

    if (result && result[1]) {
      const address = result[1];
      try {
        const response = await axios.get(
          `https://mempool.space/api/address/${address}`
        );
        const data = response.data;
        const balance =
          (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) /
          100000000;
        const message = `
📝 Address: ${address}\n
↩️ Total received: ${data.chain_stats.funded_txo_sum / 100000000} BTC\n
↪️ Total sent: ${data.chain_stats.spent_txo_sum / 100000000} BTC\n
⚖️ Balance: ${balance} BTC\n
🧮 Transaction  count: ${data.chain_stats.tx_count}
`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🔙 Back to Address Overview",
                  callback_data: "addressDetail",
                },
                {
                  text: "🔝 Back to Top",
                  callback_data: "explorer",
                },
              ],
            ],
          },
        });
      } catch (error) {
        console.error(error);
        await ctx.reply("Please enter a valid Bitcoin address 👇");
      }
    } else {
      await ctx.reply("Please enter a valid Bitcoin address after /history 👇");
    }
  });
};
