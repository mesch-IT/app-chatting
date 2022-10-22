const express = require('express')
const cors = require('cors')
const passport = require('passport')
const routesUser = require('./routes/userRouter')
const routesChat = require('./routes/chatRouter')
const routesMessage = require('./routes/messageRouter')
const http = require('http')

const { Server } = require("socket.io")


const app = express()

const server = http.createServer(app)
const io = new Server(server)

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 const corsOption = {
    origin: ['http://localhost:3000']
}
app.use(cors(corsOption))



app.use("/users", routesUser)
app.use("/chat", routesChat)
app.use("/message", routesMessage)

server.listen(3001, () => {
    console.log("server listening on port 3001")
})