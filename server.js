const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;
const token = '7017866076:AAEdXfUfpjt-sltJeMJOfeo4liukNzz2TKE';

app.use(bodyParser.json());

const bot = new TelegramBot(token, { polling: false });

app.post('/send-order-message', (req, res) => {
    const orderInfo = req.body.orderInfo;

    const chatId = req.body.chatId;

    bot.sendMessage(chatId, orderInfo).then(() => {
        console.log('Order message sent successfully');
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error sending order message:', error);
        res.status(500).send('Error sending order message');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});