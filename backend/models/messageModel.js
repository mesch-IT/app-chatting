const { Schema, Mongoose, default: mongoose } = require('mongoose')

const messageSchema = new Schema({
    chatId: {
        type : String
    },
    senderId: {
        type : String
    },
    text: {
        type : String
    },
    urlImageDb: {
      type : String   
    }
},
    {
    timestamps: true
    })

const messageModel = mongoose.model('Message', messageSchema)
    
module.exports = messageModel