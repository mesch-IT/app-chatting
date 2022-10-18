const { userChats, findChat, addChat } = require('../controllers/chatController.js')

const router = require('express').Router()


router.post("/createChat", addChat)
router.get("/:userId", userChats)
router.post("/:firstId/:secondId", findChat)

module.exports = router