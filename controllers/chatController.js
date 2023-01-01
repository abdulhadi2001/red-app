const asyncHandler = require('express-async-handler')
const Chat = require('../models/Chat')
const User = require('../models/User')

//create or fetch one one
const accessChat = asyncHandler(async(req, res)=>{
    const {userId} = req.body
    if (!userId) {
        console.log('UserId param not sent with request')
        return res.sendStatus(400)
    }

    var isChat = await Chat.find({
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    })
    .populate('users', '-Password')
    .populate('latestMessage')

    isChat = await User.populate(isChat,{
        path: 'latestMessage.sender',
        select: 'Name Photo Email'
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    }else{
        var chatData = {
            chatName: 'sender',
            users: [req.user._id, userId]
        }
    }

    try {
        const createdChat = await Chat.create(chatData)

        const FullChat = await Chat.findOne({_id: createdChat._id})
        .populate('users', '-Password')
        res.status(200).json(FullChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const fetchChats = asyncHandler(async(req, res)=>{

})



module.exports = {
    accessChat,
    fetchChats
}