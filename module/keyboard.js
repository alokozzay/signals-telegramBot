const keyboard = {
    start: [
        [
            {
                text: `Cool! Where should i start? 💰`,
                callback_data: 'second',
            }
        ],
        [
            {
                text: `Feedback from people 🔥`,
                callback_data: 'comment',
            }
        ]
    ],
    second: [
        [
            {
                text: `JOIN THE VIP 😎`,
                callback_data: 'join', 
            }
        ]
    ],
    comment: [
        [
            {
                text: `I WANT TO🔥`,
                callback_data: 'second',  
            }
        ]
    ],
    join: [
        [
            {
                text: `WRITE TO ME ✍️`,
                callback_data: 'write',  
                url: 'https://t.me/JackMoney1'
            }
        ],
        [
            {
                text: `ALREADY HAVE AN ACCOUNT 😔`,
                callback_data: 'account',  
            }
        ],
    ],
    write: [
        [
            {
                text: `WRITE TO ME ✍️`,
                callback_data: 'write',  
                url: 'https://t.me/JackMoney1'
            }
        ]
    ],
    
}

module.exports = keyboard;