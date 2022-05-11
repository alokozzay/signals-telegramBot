const TelegramAPI = require('node-telegram-bot-api') // фреймворк для работы с API Telegram
const keyboard =  require ('./module/keyboard')
const messageText =  require ('./module/text.js')

const mongoose = require('mongoose') // база данных MongoDB
const User = require('./models/users') // експорт модель базы данных

require('dotenv').config();


const bot = new TelegramAPI(process.env.KEY, { polling: true})
const adm = new TelegramAPI(process.env.KEY2, { polling: true})


// подключение к базе данных, в случае ошибки выводим в консоль.
mongoose
    .connect(process.env.TOKENBD, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then((res) => console.log('Connection to DataBase...'))
    .catch( err => console.log(err));


// Обработка команды start
// а также сбор информации и отправка в базу данных
bot.onText(/\/start/, msg => {

    const ChatId = msg.chat.id;
    const UserName = msg.from.first_name;

    const users = new User({ChatId, UserName});
    users
        .save()
        .then(res => console.log('very good!'))
        .catch(err => console.log(err))

    // Отправка текста и использование клавиатуры.
    bot.sendPhoto(ChatId, './src/start.jpg', {
        caption: `Welcome!  ${UserName} 

These are not sports betting, casinos and other garbage😬. We can read this graph, analyze it and give good results 💰
                
This is a place where it doesn't matter how old you are, what your marital status, education and what kind of person you are❗️
                
>>>`,
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: keyboard.start
        }
    }) 
})


// отслеживаем нажатие клавиатуры
// исходя за значением data, будем выбирать что и отправлять.
bot.on('callback_query', query => {

    const ChatId = query.message.chat.id;
    const messageId = query.message.message_id;
    
    switch(query.data){
        case 'second': 
            bot.sendVideo(ChatId, './src/second.mp4', {
                caption: messageText.second,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: keyboard.second
                }
            })
            break
        

        case 'join':
            bot.sendPhoto(ChatId, './src/join.jpg', {
                caption: messageText.join,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: keyboard.join
                }
            })
            break


        case 'account': 
            bot.sendMessage(ChatId, messageText.account, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: keyboard.write
                }
            })
            break


        case 'comment':
            bot.sendPhoto(ChatId, './src/comment.jpg', {
                caption: messageText.comment,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: keyboard.comment
                }
            })
    }
})

// при получение текста в бота админку
// мы парсим в HTML И собираем всю базу в массив
// затем распаршенный текст мы отправляем через цикл
adm.on('message', async msg => { 

    const log = await User.find( { }, { ChatId: 1, _id: 0 } );
    
    for (let i = 0; i < log.length; i++) {

        bot.sendMessage(log[i].ChatId, msg.text, {
            parse_mode: 'HTML',
        })

    }
})