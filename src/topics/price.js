const axios = require("axios");

async function sendPrice(ctx, bot) {
  try {
    let res = await axios.get("https://mempool.space/api/v1/prices");
    let data = res.data;
    console.log(data);
    //Umwandlung der Unix-Zeit in Milisekunden und Erstellung eines Date-Objekts
    let date = new Date(data.time * 1000);
    // Darstellung des Datums in einem lesbaren Format
    let timestamp = date.toLocaleString();

    let prices = `USD ${data.USD}\nEUR ${data.EUR}\nGDP ${data.GBP}\nCAD ${data.CAD}\nCHF ${data.CHF}\nAUD ${data.AUD}\nJPY ${data.JPY}`;
    let message = `Latest Bitcoin prices denominated in dirty fiat:\n\n${prices}`;
    await bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔙 Back to price details",
              callback_data: "price",
            },
          ],
        ],
      },
    });
  } catch (error) {
    console.log(error);
    await ctx.reply("Something went wrong 🚧");
  }
}
module.exports = { sendPrice };
