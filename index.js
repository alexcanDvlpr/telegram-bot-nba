'use strict'

// Creamos el BOT TELEGRAM API
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config').config();
var Client = require('node-rest-client').Client;

var client = new Client();


const token = config.token_telegram;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/^\/start/, (msg) => {

    const chatId = msg.chat.id;
    var name = msg.from.first_name;

    bot.sendMessage(chatId, 'Buenas ' + name + '! Ya me has despertado... Cuentame!');
});

bot.onText(/^\/nba/, (msg) => {

    const chatId = msg.chat.id;
    var name = msg.from.first_name;

    let teams = [];
    getTeamsNBA(bot, chatId);
});


function getTeamsNBA(bot, chatId) {
    client.get("http://data.nba.net/prod/v1/2016/teams.json", (data, response) => {

        let teams = data.league.standard;
        let names = '';

        for (let team of teams) {
            if (team.isNBAFranchise) {
                names += '· '+team.fullName+'\n';
            }
        }

        bot.sendMessage(chatId, 'Lista de Equipos NBA: \n ' + names);
    });
}


