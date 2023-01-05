const mongoose = require('mongoose')

const chatModel = new mongoose.Schema({
    chatName:{
        type: String,
        trim: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    
})

module.exports = mongoose.model('Chat', chatModel)