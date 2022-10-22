const { Schema,Mongoose, default: mongoose } = require('mongoose')

const chatSchema = new Schema({
    members: {
        type : Array
    }
    
})

const ChatModel = mongoose.model('Chat', chatSchema)

module.exports = ChatModel