const ChatModel = require("../models/chatModel")

const MessageModel = require("../models/messageModel")

const addChat = (req, res) => {

    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
    })

    newChat.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

const userChats = (req, res) => {

    ChatModel.find({
        members: { $in: [req.params.userId] }
    })
        .then((resultat) => {
            res.status(200).json(resultat)
            
        } )
   
        .catch((err) => res.status(500).json(err))
}

const findChat = async (req, res) => { 

    let chat = await  ChatModel.findOne({
        members : {$all : [req.params.firstId,req.params.secondId]}
    })

    if (chat !== null) {
        let chatId = chat._id
        let messages = await MessageModel.find({ chatId })
          
        return res.status(200).json({
            messages,
            chatId
          })
        
          
    }

    if (chat == null) {
       
        chat = new ChatModel({
            members: [req.params.firstId, req.params.secondId] 
        })
        chat.save()
            .then((data) => {
            res.status(201).json({ message: "New chat created", data: data })
                
            })           
    }
 
  

    // else {
  
    // }

}



module.exports = {
    addChat,
    userChats,
    findChat
}