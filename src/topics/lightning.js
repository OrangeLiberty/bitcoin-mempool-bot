//Axios Modul
const axios = require("axios");
//Returns aggregate capacity and number of clearnet nodes per country. Capacity figures are in satoshis.
async function sendTopCountry(ctx, bot) {
  try {
    //API request
    let res = await axios.get(
      "https://mempool.space/api/v1/lightning/nodes/countries"
    );
    let data = res.data;
    let message = ``;
    for (let i = 0; i < 10; i++) {
      message += `------\n🏆 Rank: ${i + 1}\n🌐 Country: ${data[i].name.en}, ${
        data[i].name["pt-BR"]
      }, ${data[i].name.es}\n📊 Nodes: ${data[i].count}\n🔄 Share: ${
        data[i].share
      }\n💰 Capacity: ${Math.round(data[i].capacity / 1000000) / 100} BTC\n`;
    }
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Aggregate Capacity and Number of Clearnet Nodes per Country:\n" +
        message,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔝 Back to Top",
                callback_data: "explorer",
              },
              {
                text: "🔙 Back to Lightning",
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
}
//Return the latest Lightning Network Statistics
async function sendNetworkStats(ctx, bot) {
  try {
    //API request
    let res = await axios.get(
      "https://mempool.space/api/v1/lightning/statistics/latest"
    );
    //Latest network statistics
    let data = res.data.latest;
    //split date time
    let date = data.added.split("T")[0];

    let message = `
⚡️ Nodes: ${data.node_count}
😎 Channels: ${data.channel_count}
💰 Total Capacity: ${Math.round(data.total_capacity / 1000000) / 100} BTC
🧅 Tor Nodes: ${data.tor_nodes}
👁 Clearnet Nodes: ${data.clearnet_nodes}\n
Channels Details:\n
📐 Average Capacity: ${data.avg_capacity} sat
       Median Capacity: ${data.med_capacity} sat
💸 Average Fee Rate: ${data.avg_fee_rate} ppm
       Median Fee Rate: ${data.med_fee_rate} ppm
⚖️ Average Base Fee: ${data.avg_base_fee_mtokens} ppm
       Median Base Fee: ${data.med_base_fee_mtokens} ppm\n
🕦 At the time: ${date}`;

    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Lastest Lightning Network Statistics:\n" + message,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔝 Back to Top",
                callback_data: "explorer",
              },
              {
                text: "🔙 Back to Lightning",
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
}

//Return the TopLiquidityNodes
async function sendTopLiquidity(ctx, bot) {
  try {
    //API request
    let res = await axios.get(
      "https://mempool.space/api/v1/lightning/nodes/rankings/liquidity"
    );
    let data = res.data;
    let message = ``;

    for (let i = 0; i < 10; i++) {
      let country = data[i].country ? `${data[i].country.en}` : "unknown";
      let city = data[i].city ? `${data[i].city.en}` : "unknown";

      message += `
🏆 Rank: ${i + 1}
✍️ Alias: ${data[i].alias}
💰 Capacity: ${Math.round(data[i].capacity / 1000000) / 100} BTC
😎 Channels: ${data[i].channels}
📅 First Seen: ${new Date(data[i].firstSeen * 1000)}
🕦 Last Update: ${new Date(data[i].updatedAt * 1000)}
🔑 Public Key: ${data[i].publicKey}
📍 Location: ${country}, ${city}\n\n-------\n`;
    }
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Top Nodes by Liquidity (aggregate channel capacity):\n" + message,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔝 Back to Top",
                callback_data: "explorer",
              },
              {
                text: "🔙 Back to Lightning",
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
}
//Return the Top Channel Nodes
async function sendTopChannel(ctx, bot) {
  try {
    //API request
    let res = await axios.get(
      "https://mempool.space/api/v1/lightning/nodes/rankings/connectivity"
    );
    let data = res.data;
    let message = ``;

    for (let i = 0; i < 10; i++) {
      let country = data[i].country ? `${data[i].country.en}` : "unknown";
      let city = data[i].city ? `${data[i].city.en}` : "unknown";

      message += `
🏆 Rank: ${i + 1}
✍️ Alias: ${data[i].alias}
💰 Capacity: ${Math.round(data[i].capacity / 1000000) / 100} BTC
😎 Channels: ${data[i].channels}
📅 First Seen: ${new Date(data[i].firstSeen * 1000)}
🕦 Last Update: ${new Date(data[i].updatedAt * 1000)}
🔑 Public Key: ${data[i].publicKey}
📍 Country: ${country}, ${city}\n\n-------\n`;
    }
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Top Nodes by connectivity (number of open channels):\n" + message,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔝 Back to Top",
                callback_data: "explorer",
              },
              {
                text: "🔙 Back to Lightning",
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
}
module.exports = {
  sendTopCountry,
  sendNetworkStats,
  sendTopLiquidity,
  sendTopChannel,
};
