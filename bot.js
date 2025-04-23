const { ActivityHandler } = require('botbuilder');
const axios = require('axios');

class MyBot extends ActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      const text = context.activity.text;
      const userId = context.activity.from.id;

      try {
        const response = await axios.post(process.env.PA_FLOW_ENDPOINT, {
          message: text,
          userId: userId
        });

        const replyText = response.data.answer || 'Нет ответа от Copilot.';
        await context.sendActivity(replyText);
      } catch (err) {
        console.error('Ошибка при вызове Flow:', err.message);
        await context.sendActivity('Ошибка при обращении к Copilot.');
      }

      await next();
    });
  }
}

module.exports.MyBot = MyBot;
