const io = require('socket.io')(8800, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let activeUsers = []

io.on("connection", (socket) => {

    socket.on("join-room", (chatId) => {
        socket.join(chatId)
    })

    socket.on("send-message", (message) => { 
        console.log(message)
        
        socket.to(message.chatId).emit("receive-message",message)

    })
    
    // //add new user
    // socket.on("new-user", (newUserId) => {

    //     // check if user already exists

    //     if (!activeUsers.some(user => user.userId === newUserId)) {
            
    //         activeUsers.push({
    //             userId: newUserId,
    //             socketId: socket.id
    //         })
    //     }
    //     console.log("connected users",activeUsers)
    //     io.emit('get-users',activeUsers)
    // })

    // // send message
    // socket.on("send-message", (data) => {
    //     console.log("send message", data)
         
    //     const user = activeUsers.find(user => user.userId === data.receiverId)
    //     console.log(user)
    //     if (user) {
    //         console.log("userS", data)
    //          console.log("coucou")
    //         io.to(user.socketId).emit("receive-message",data)
    //     }
    // })

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id)
        
        console.log("User disconnected", activeUsers)
        
        io.emit('get-users', activeUsers)
    })
})

