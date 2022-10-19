const { addMessage } = require('../controllers/messageController')

const router = require('express').Router()

router.post("/newMessage", addMessage)

module.exports = router