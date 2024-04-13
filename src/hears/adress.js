const axios = require("axios");

module.exports = (bot) => {
  //Takes an adress and returns UTXOS # BC1Q
  bot.hears(/^[bB][cC]1[qQ][0-9a-zA-Z]{38}$/gm, async (ctx) => {
    try {
      let adressMessage = ctx.match[0];
      //API
      let res = await axios.get(
        `https://mempool.space/api/address/${adressMessage}/utxo`
      );
      let data = res.data;
      let message = ``;
      let i = 0;
      let maxIterations = 15;

      for (const item of data) {
        if (i >= maxIterations) {
          break; // Beendet die Schleife, sobald die maximale Anzahl an Iterationen erreicht ist
        }

        message += `
🍕 UTXO: ${i + 1}
🪪 Transaction-Id: ${item.txid}
📍 Position: ${item.vout}
✅ Confirmed: ${item.status.confirmed} @⏳ Blocktime ${item.status.block_height}
🧮 Block Hash: ${item.status.block_hash}
💰 Value: ${item.value.toLocaleString()} sat\n
`;
        i++;
      }

      await bot.telegram.sendMessage(
        ctx.chat.id,
        "Unspent Transaction Outputs:\n" + message,
        {
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
        }
      );
    } catch (error) {
      console.log(error);
      await ctx.reply("Something went wrong");
    }
  });
  //Takes an adress and returns UTXOS # OLD 1/3
  bot.hears(/^[13][0-9a-zA-Z]{32,34}$/gm, async (ctx) => {
    try {
      let adressMessage = ctx.match[0];
      //API
      let res = await axios.get(
        `https://mempool.space/api/address/${adressMessage}/utxo`
      );
      let data = res.data;
      let message = ``;
      let i = 0;
      let maxIterations = 15;
      for (const item of data) {
        if (i >= maxIterations) {
          break; // Beendet die Schleife, sobald die maximale Anzahl an Iterationen erreicht ist
        }

        message += `
🍕 UTXO: ${i + 1}
🪪 Transaction-Id: ${item.txid}
📍 Position: ${item.vout}
✅ Confirmed: ${item.status.confirmed} @⏳ Blocktime ${item.status.block_height}
🧮 Block Hash: ${item.status.block_hash}
💰 Value: ${item.value.toLocaleString()} sat\n
`;
        i++;
      }
      await bot.telegram.sendMessage(
        ctx.chat.id,
        "Unspent Transaction Outputs:\n" + message,
        {
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
        }
      );
    } catch (error) {
      console.log(error);
      await ctx.reply("Something went wrong");
    }
  });
  //Takes an adress and returns UTXOS # BC1P
  bot.hears(/^[bB][cC]1[pP][0-9a-zA-Z]{58}$/gm, async (ctx) => {
    try {
      let adressMessage = ctx.match[0];
      //API
      let res = await axios.get(
        `https://mempool.space/api/address/${adressMessage}/utxo`
      );
      let data = res.data;
      let message = ``;
      let i = 0;
      let maxIterations = 15;
      for (const item of data) {
        if (i >= maxIterations) {
          break; // Beendet die Schleife, sobald die maximale Anzahl an Iterationen erreicht ist
        }
        message += `
🍕 UTXO: ${i + 1}
🪪 Transaction-Id: ${item.txid}
📍 Position: ${item.vout}
✅ Confirmed: ${item.status.confirmed} @⏳ Blocktime ${item.status.block_height}
🧮 Block Hash: ${item.status.block_hash}
💰 Value: ${item.value.toLocaleString()} sat\n
`;
        i++;
      }
      await bot.telegram.sendMessage(
        ctx.chat.id,
        "Unspent Transaction Output:\n" + message,
        {
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
        }
      );
    } catch (error) {
      console.log(error);
      await ctx.reply("Something went wrong");
    }
  });
  //
};
