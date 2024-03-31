const axios = require("axios");

module.exports = (bot) => {
  //Takes an TXID and returns TX details
  bot.hears(/^[A-Za-z0-9]{64}$/gm, async (ctx) => {
    try {
      let txMessage = ctx.match[0];
      //API
      let res = await axios.get(`https://mempool.space/api/tx/${txMessage}`);
      let data = res.data;
      let timeStamp = data.status.block_time * 1000;
      let time = new Date(timeStamp);

      let message = `🔎 Transaction: ${data.txid}\n\n🕦 Timestamp: ${time}\n\n⏳ Blocktime: ${data.status.block_height}\n📐 Size: ${data.size} B\n⚖️ Weight: ${data.weight} kWU\n💸 Fee: ${data.fee} sat\n✅ Confirmed: ${data.status.confirmed}\n(max. 20 Inputs & Outputs)\n\n`;
      let inputs = data.vin;
      let outputs = data.vout;
      // Maximale Anzahl an Iterationen
      let maxIterations = 20;

      let txInput = ``;
      let txOutput = ``;
      let i = 0;
      for (const item of inputs) {
        if (i >= maxIterations) {
          break; // Beendet die Schleife, sobald die maximale Anzahl an Iterationen erreicht ist
        }
        // Daten zu txInput hinzufügen
        let adress = inputs[i].prevout
          ? `${item.prevout.scriptpubkey_address}`
          : "Coinbase";
        let value = inputs[i].prevout
          ? `${item.prevout.value / 100000000} BTC\n`
          : " ";
        txInput += `${adress}\n${value}`;

        i++; // Zähler nach der Verarbeitung des aktuellen Elements inkrementieren
      }

      i = 0;
      for (const item of outputs) {
        if (i >= maxIterations) {
          break;
        }
        let adress = outputs[i].scriptpubkey_address
          ? `${item.scriptpubkey_address}`
          : "OP-Return";
        let value = outputs[i].value ? `${item.value / 100000000} BTC\n` : "";
        txOutput += `${adress}\n${value}`;

        i++;
      }

      await bot.telegram.sendMessage(
        ctx.chat.id,
        message + "⤴️ Input:\n" + txInput + "\n⤵️ Output:\n" + txOutput,
        {
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
