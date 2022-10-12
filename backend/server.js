const express = require('express')
const cors = require('cors')
const passport = require('passport')
const routesUser = require('./routes/userRouter')
const routesChat = require('./routes/chatRouter')
const routesMessage = require('./routes/messageRouter')

const app = express()

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

app.listen(3001, () => {
    console.log("server listening on port 3001")
})