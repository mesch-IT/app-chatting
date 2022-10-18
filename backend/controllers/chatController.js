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

    if (!chat) {
       
        chat = new ChatModel({
            members: [req.params.firstId, req.params.secondId] 
        })
        chat.save()
            .then((data) => { 
                res.status(404).json({ message: "New chat created" , data: data})
            })
    } else {
       let chatId = chat._id
        MessageModel.find({ chatId})
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    }

    // chat ? res.status(200).json(chat)
    //     :
    // chat = new ChatModel({
    //     members: [req.params.senderId, req.params.receiverId]
    // })
    // chat.save()
    //     .then(() => { 
    //         res.status(201).json({ message : "chat saved successfully"})
    //     })
 

    // ChatModel.findOne({
    //     members : {$all : [req.params.firstId,req.params.secondId]}
    // })
    //     .then((resultat) => res.status(200).json(resultat))
        
    //     .catch((err) => res.status(500).json(err))
}



module.exports = {
    addChat,
    userChats,
    findChat
}