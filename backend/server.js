const express = require('express')

const routes = require('./routes/userRouter')

const app = express()

app.use(express.json())

app.use("/", routes)

app.listen(3001, () => {
    console.log("server listening on port 3001")
})