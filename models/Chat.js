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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Chat', chatModel)