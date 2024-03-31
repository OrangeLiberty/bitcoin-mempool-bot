const axios = require("axios");

//Return the latest bitcoin price
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
    let message = `Latest Bitcoin prices:\n\n${prices}\n\n@${timestamp}`;
    await bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔝 Back to Top",
              callback_data: "explorer",
            },
            {
              text: "🔙 Back to Market Data",
              callback_data: "marketData",
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
//Return the moscowtime
async function sendMoscowTime(ctx, bot) {
  try {
    let res = await axios.get("https://mempool.space/api/v1/prices");
    let data = res.data;
    let date = new Date(data.time * 1000);
    // Darstellung des Datums in einem lesbaren Format
    let timestamp = date.toLocaleString();

    let moscowPrices = `${Math.round(100000000 / data.USD)} sat/$\n${Math.round(
      100000000 / data.EUR
    )} sat/€\n${Math.round(100000000 / data.GBP)} sat/£\n${Math.round(
      100000000 / data.JPY
    )} sat/¥\n`;
    let message = `Current Moscow Time:\n\n${moscowPrices}\n@${timestamp}`;
    await bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔝 Back to Top",
              callback_data: "explorer",
            },
            { text: "🔙 Back to Market Data", callback_data: "marketData" },
          ],
        ],
      },
    });
  } catch (error) {
    console.log(error);
    ctx.reply("Something went wrong 🚧");
  }
}
//Return the marketcap
async function sendMarketCap(ctx, bot) {
  try {
    let res = await axios.get("https://blockchain.info/q/marketcap");
    let data = Math.round(res.data);
    let cap = data.toLocaleString();
    console.log(data);
    let message = `Bitcoin Market Cap (based on 24 hour weighted price):\n\n ${cap} USD`;
    await bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔝 Back to Top",
              callback_data: "explorer",
            },
            { text: "🔙 Back to Market Data", callback_data: "marketData" },
          ],
        ],
      },
    });
  } catch (error) {
    console.log(error);
    ctx.reply("Something went wrong 🚧");
  }
}
//Return the Circulating supply
async function sendSupply(ctx, bot) {
  try {
    let res = await axios.get("https://blockchain.info/q/totalbc");
    let data = res.data;
    let supply = data / 100000000;
    let amount = supply.toLocaleString();
    let message = `Total Bitcoins in circulation (delayed by up to 1 hour):\n\n${amount} BTC`;
    await bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔝 Back to Top",
              callback_data: "explorer",
            },
            { text: "🔙 Back to Market Data", callback_data: "marketData" },
          ],
        ],
      },
    });
  } catch (error) {
    console.log(error);
    ctx.reply("Something went wrong 🚧");
  }
}
module.exports = { sendPrice, sendMoscowTime, sendMarketCap, sendSupply };
