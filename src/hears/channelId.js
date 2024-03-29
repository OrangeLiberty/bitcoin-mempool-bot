const axios = require("axios");

module.exports = (bot) => {
  //Return infos about a Lightning Channel with the given :channelID
  bot.hears(/^[0-9]{18}$/gm, async (ctx) => {
    try {
      let channelId = ctx.match[0];
      let res = await axios.get(
        `https://mempool.space/api/v1/lightning/channels/${channelId}`
      );
      let data = res.data;
      //split date time
      let createdDate = data.created.split("T")[0];
      let updatedDate = data.updated_at
        ? `⏱ Updated: ${data.updated_at.split("T")[0]}`
        : "";
      let closingDate = data.closing_date
        ? `📅 Closing date: ${data.closing_date.split("T")[0]}`
        : "";
      let closingTX = data.closing_transaction_id
        ? `⤵️ Closing TX: ${data.closing_transaction_id}`
        : "";
      let reason =
        data.closing_reason === 1
          ? `Closing reason: Mutually closed`
          : data.closing_reason === 2
          ? `Closing reason: Force closed`
          : data.closing_reason === null
          ? ""
          : "unknown";
      let status =
        data.status === 1
          ? `Active 🟢`
          : data.status === 2
          ? `Closed 🔴`
          : data.status === null
          ? ""
          : "unknown";

      let message = `
🆔 Channel ID: ${data.id}
💰 Channel Capacity: ${data.capacity} sat\n
🕦 Created: ${createdDate}
${updatedDate}
${closingDate}\n
⤴️ Funding TX: ${data.transaction_id}
${closingTX}
Channel state : ${status}
${reason}
Single Funded: ${data.single_funded}

👤 Channel Partner 1:\n
✍️ Name: ${data.node_left.alias}
🔑 Public Key: ${data.node_left.public_key}
😎 Channels: ${data.node_left.channels}
⚡️ Capacity: ${data.node_left.capacity} sat
💸 Fee Rate: ${data.node_left.fee_rate} ppm
💵 Base Fee: ${data.node_left.base_fee_mtokens} ppm
📃 Min HTLC: ${data.node_left.min_htlc_mtokens} sat
📝 Max HTLC: ${data.node_left.max_htlc_mtokens / 1000} sat
👉 Timelock Delta: ${data.node_left.cltv_delta} Blocks
⚖️ Funding Balance: ${data.node_left.funding_balance}
⚖️ Closing Balance: ${data.node_left.closing_balance}\n
👤 Channel Partner 2:\n
✍️ Name: ${data.node_right.alias}
🔑 Public Key: ${data.node_right.public_key}
😎 Channels: ${data.node_right.channels}
⚡️ Capacity: ${data.node_right.capacity} sat
💸 Fee Rate: ${data.node_right.fee_rate} ppm
💵 Base Fee: ${data.node_right.base_fee_mtokens} ppm
📃 Min HTLC: ${data.node_right.min_htlc_mtokens} sat
📝 Max HTLC: ${data.node_right.max_htlc_mtokens / 1000} sat
👉 Timelock Delta: ${data.node_right.cltv_delta} Blocks
⚖️ Funding Balance: ${data.node_right.funding_balance}
⚖️ Closing Balance: ${data.node_right.closing_balance}\n`;

      await bot.telegram.sendMessage(
        ctx.chat.id,
        "Lightning Channel Info:\n" + message,
        {
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
        }
      );
    } catch (error) {
      console.log(error);
      await ctx.reply("Something went wrong 🚧");
    }
  });
};
