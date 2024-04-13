const axios = require("axios");

module.exports = (bot) => {
  bot.command("channel", async (ctx) => {
    const text = ctx.message.text;
    const regex = /\/channel\s+(.+)/;
    const result = text.match(regex);

    if (result && result[1]) {
      const pubKey = result[1];
      try {
        const response = await axios.get(
          `https://mempool.space/api/v1/lightning/channels?public_key=${pubKey}&status=active`
        );
        const data = response.data;

        let message = ``;

        for (const item of data) {
          let status =
            item.status === 1
              ? `Active 🟢`
              : item.status === 2
              ? `Closed 🔴`
              : item.status === null
              ? ""
              : "unknown";

          let capacity = item.capacity;
          let channelID = item.id;
          let feeRate = item.fee_rate;
          let partner = item.node.alias;
          let partnerPubKey = item.node.public_key;
          let partnerChannel = item.node.channels;
          let partnerCapacity = item.node.capacity;
          message += `
⚡️ Status: ${status}
🆔 Channel ID: ${channelID}
💰 Capacity: ${capacity.toLocaleString()} sat
💸 Fee Rate: ${feeRate} ppm
👤 Partner: ${partner}
🔑 Public Key: ${partnerPubKey}
😎 Channels: ${partnerChannel}
💵 Capacity: ${partnerCapacity / 100000000} BTC\n`;
        }

        await bot.telegram.sendMessage(
          ctx.chat.id,
          "10 Biggest Channels based on Public Key:\n" + message,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🔙 Back to Lightning Overview",
                    callback_data: "lightning",
                  },
                  {
                    text: "🔝 Back to Top",
                    callback_data: "explorer",
                  },
                ],
              ],
            },
          }
        );
      } catch (error) {
        console.error(error);
        await ctx.reply("Please enter a valid Node Pubkey 👇");
      }
    } else {
      await ctx.reply("Please enter a valid Node Pubkey after /channel 👇");
    }
  });
};
