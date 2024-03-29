const axios = require("axios");

module.exports = (bot) => {
  //Return a list of a node's channels given its :pubKey
  bot.hears(/^[A-Fa-f0-9]{66}$/gm, async (ctx) => {
    try {
      let pubKey = ctx.match[0];
      //API
      let res = await axios.get(
        `https://mempool.space/api/v1/lightning/nodes/${pubKey}`
      );

      let data = res.data;

      let country = data.country ? `${data.country.en}` : "unknown";
      let city = data.city ? `${data.city.en}` : "unknown";
      let subdivision = data.subdivision ? `${data.subdivision.en}` : "unknown";

      let message = `
✍️ Alias: ${data.alias}\n
🔑 Public Key: ${data.public_key}\n
💰 Total Capacity: ${data.capacity} sat\n
😎 Active Channels: ${data.active_channel_count}\n
💤 Disabled Channels: ${data.opened_channel_count}\n
🚫 Closed Channels: ${data.closed_channel_count}\n
📐 Average Channel Size: ${Math.round(
        data.capacity / data.active_channel_count
      )} sat\n
📍 Location: ${country}, ${city}, ${subdivision}\n
💻 IP Address: ${data.sockets}\n
📅 First Seen:\n ${new Date(data.first_seen * 1000)}
🕦 Last Update:\n ${new Date(data.updated_at * 1000)}`;

      await bot.telegram.sendMessage(ctx.chat.id, "Node Details:\n" + message, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔙 Back to Lightning Network Overview",
                callback_data: "lightning",
              },
            ],
          ],
        },
      });
    } catch (error) {
      console.log(error);
      await ctx.reply("Something went wrong 🚧");
    }
  });
};
