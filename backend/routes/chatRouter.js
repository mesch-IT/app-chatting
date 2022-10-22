const { userChats, findChat} = require('../controllers/chatController.js')

const router = require('express').Router()

router.get("/:userId", userChats)
router.post("/:firstId/:secondId", findChat)

module.exports = router