const keyboard = {
    start: [
        [
            {
                text: `Cool! Where should i start? π°`,
                callback_data: 'second',
            }
        ],
        [
            {
                text: `Feedback from people π₯`,
                callback_data: 'comment',
            }
        ]
    ],
    second: [
        [
            {
                text: `JOIN THE VIP π`,
                callback_data: 'join', 
            }
        ]
    ],
    comment: [
        [
            {
                text: `I WANT TOπ₯`,
                callback_data: 'second',  
            }
        ]
    ],
    join: [
        [
            {
                text: `WRITE TO ME βοΈ`,
                callback_data: 'write',  
                url: 'https://t.me/JackMoney1'
            }
        ],
        [
            {
                text: `ALREADY HAVE AN ACCOUNT π`,
                callback_data: 'account',  
            }
        ],
    ],
    write: [
        [
            {
                text: `WRITE TO ME βοΈ`,
                callback_data: 'write',  
                url: 'https://t.me/JackMoney1'
            }
        ]
    ],
    
}

module.exports = keyboard;