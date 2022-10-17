const ChatModel = require("../models/chatModel")

const createChat = (req, res) => {

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

    const chat = await  ChatModel.findOne({
        members : {$all : [req.params.firstId,req.params.secondId]}
    })

        res.status(200).json(chat)

 

    // ChatModel.findOne({
    //     members : {$all : [req.params.firstId,req.params.secondId]}
    // })
    //     .then((resultat) => res.status(200).json(resultat))
        
    //     .catch((err) => res.status(500).json(err))
}



module.exports = {
    createChat,
    userChats,
    findChat
}