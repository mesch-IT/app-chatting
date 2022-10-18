const { addMessage } = require('../controllers/messageController')

const router = require('express').Router()

router.post("/", addMessage)

module.exports = router