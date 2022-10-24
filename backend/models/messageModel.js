const { Schema, Mongoose, default: mongoose } = require('mongoose')

const messageSchema = new Schema({
    chatId: {
        type : String
    },
    senderId: {
        type : String
    },
    receiverId: {
        type: String
    },
    text: {
        type : String
    }
},
    {
    timestamps: true
    })

const messageModel = mongoose.model('Message', messageSchema)
    
module.exports = messageModel