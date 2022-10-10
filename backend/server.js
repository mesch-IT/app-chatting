const express = require('express')
const cors = require('cors')
const passport = require('passport')
const routes = require('./routes/userRouter')

const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 const corsOption = {
    origin: ['http://localhost:3000']
}
app.use(cors(corsOption))

app.use("/", routes)

app.listen(3001, () => {
    console.log("server listening on port 3001")
})