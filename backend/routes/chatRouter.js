const { createChat, userChats, findChat } = require('../controllers/chatController.js')

const router = require('express').Router()


router.post("/createChat", createChat)
router.get("/:userId", userChats)
router.get("/:firstId/:secondId", findChat)

module.exports = router