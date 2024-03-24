const axios = require("axios");

//
async function sendHalving(ctx, bot) {
  try {
    let res = await axios.get("https://mempool.space/api/blocks/tip/height");
    let data = res.data;
    console.log(data);
    if (data <= 840000) {
      let period = data - 630000;
      let halving = 840000 - data;
      let halvingHours = (halving * 10) / 60;
      let halvingTime = (halving * 10) / 60 / 24;
      // Stunden extrahieren als Ganzzahl
      let halvingHour = Math.floor(halvingHours);
      // Minuten extrahieren als Dezimalteil * 60
      let halvingMinutes = Math.round((halvingHours - halvingHour) * 60);

      let halvingDays = Math.round(halvingTime);

      //Umrechung als Prozentangabe
      let progress = (period * 100) / 210000;
      let percent = Math.round(progress * 1000) / 1000;
      //Aktuelle Datum und Uhrzeit
      let now = new Date();
      console.log(halvingMinutes);
      //Zielddatum und Uhrzeit berechnen
      let target = new Date(now.getTime());
      target.setHours(now.getHours() + halvingHour);
      target.setMinutes(now.getMinutes() + halvingMinutes);

      //Zieldatum und Uhrzeit als String formatieren
      let targetDate = target.toLocaleString();

      let message = `What is a Bitcoin halving event?\n\nBitcoin halving events take place every 210000 blocks (approx. 4 years) in the Bitcoin blockchain and halve the current block reward. The original block reward of Bitcoin was 50 BTC. The current block reward is 6.25 BTC, the block reward of the next period will be 3.125 BTC.  The halving is programmed into the Bitcoin code and means that there will be a total of 21 million Bitcoins in the year 2140.\n\n
Bitcoin Halving Countdown:\n\n📦 Blocks remaining: ${halving}\n🏁 Progress: ${percent} %\n🗓 ${halvingDays} days left, or\n⏱ ${halvingHour} hours & ${halvingMinutes} minutes left \n🎯 Expected halving date: ${targetDate}`;
      await bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔙 Back to Total Overview",
                callback_data: "explorer",
              },
            ],
          ],
        },
      });
    } else {
      let notice = `The 2024 halving event is over`;
      await bot.telegram.sendMessage(ctx.chat.id, notice, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔙 Back to Total Overview",
                callback_data: "explorer",
              },
            ],
          ],
        },
      });
    }
  } catch (error) {
    console.log(error);
    await ctx.reply("Something went wrong 🚧");
  }
}
module.exports = {
  sendHalving,
};
