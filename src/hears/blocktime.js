const axios = require("axios");

module.exports = (bot) => {
  //Enter Blocktime to get BlockHash
  bot.hears(/^[1-9][0-9]{0,5}$/gm, async (ctx) => {
    try {
      let blockTime = ctx.match[0];
      //API
      let res = await axios.get(
        `https://mempool.space/api/block-height/${blockTime}`
      );
      let data = res.data;
      let resHash = await axios.get(
        `https://mempool.space/api/block/${data}/txs/`
      );
      let hashData = resHash.data;
      let message = ``;

      let i = 0;
      hashData.slice(0, 10).forEach((tx) => {
        const txid = tx.txid;
        const vinCount = tx.vin.length;
        const voutCount = tx.vout.length;
        const size = tx.size || "unbekannt";
        const weight = tx.weight || "unbekannt";
        const fee = tx.fee || "Coinbase";
        //const status = tx.status.confirmed ? "Confirmed" : "Unconfirmed";

        let totalVoutValue = 0;
        tx.vout.forEach((vout) => {
          totalVoutValue += vout.value || 0;
        });

        let totalVinPrevoutValue = 0;
        let unknownVinValue = false;
        tx.vin.forEach((vin) => {
          if (vin.prevout && vin.prevout.value) {
            totalVinPrevoutValue += vin.prevout.value;
          } else {
            unknownVinValue = true;
          }

          message += `
🏆 # ${i + 1}
🔎 ID:  ${txid}
⤴️ Inputs: ${vinCount} 💰 Value: ${totalVinPrevoutValue / 100000000} BTC
⤵️ Outputs: ${voutCount} 💰 Value: ${totalVoutValue / 100000000} BTC
📐 Size: ${size} B
⚖️ Weight: ${weight / 1000} kWU
💸 Fee (sat): ${fee.toLocaleString()}
---`;
        });
        i++;
      });

      await bot.telegram.sendMessage(
        ctx.chat.id,
        `First Transactions in Block # ${blockTime}:\n` + message,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🔝 Back to Top",
                  callback_data: "explorer",
                },
                {
                  text: "🔙 Back to Block Infomation",
                  callback_data: "blocks",
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
