//Axios Modul
const axios = require("axios");

//Return the Difficulty
async function showDifficulty(ctx, bot) {
  try {
    //API
    let res = await axios.get(
      "https://mempool.space/api/v1/difficulty-adjustment"
    );
    let data = res.data;
    let time = data.remainingTime / 1000 / 60 / 60 / 24;
    let timeAvg = data.adjustedTimeAvg / 1000 / 60;
    let now = new Date();
    let target = new Date(now.getTime() + time);

    let message = `
Difficulty Adjustment:\n
📊 Current Period: ${Math.round(data.progressPercent * 100) / 100} %\n
〽️ Average time next block: ${Math.round(timeAvg * 100) / 100} min\n
🏗 Next Retarget Height: ${data.nextRetargetHeight}\n
📦 Remaining Blocks: ${data.remainingBlocks} (~${Math.floor(time)} days)\n
⏱ Estimated Time: ${target.toLocaleString()}\n 
🗒 Estimated Adjustment: ${Math.round(data.difficultyChange * 100) / 100} %\n
🎯 Expected Blocks: ${Math.floor(data.expectedBlocks)}\n
🏁 Previous Retarget: ${Math.round(data.previousRetarget * 100) / 100} %\n`;

    await bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔙 Back to Total Overview", callback_data: "explorer" }],
        ],
      },
    });
    await ctx.answerCbQuery();
  } catch (error) {
    console.log(error);
    await ctx.reply("Something went wrong 🚧");
  }
}
module.exports = {
  showDifficulty,
};
