const ChatModel = require('../models/chatModel')
const MessageModel = require('../models/messageModel')

const addMessage = (req, res) => {

    const { chatId, senderId, text, urlImageDb } = req.body

    const newMessage = new MessageModel({
        chatId,
        senderId,
        text,
        urlImageDb
    })
    newMessage.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}



 
module.exports = {
    addMessage
}

