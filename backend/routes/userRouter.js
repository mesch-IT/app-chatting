const router = require('express').Router()
const { check} = require('express-validator')
const { addUser, login, secretRoute, getAllUser } = require('../controllers/userController')
const passport = require('passport')

require("../controllers/passport")


router.get("/home", passport.authenticate("jwt", { session: false }), secretRoute)

router.get("/:id",getAllUser)

router.post("/login",login)

router.post("/register",[
    check("username").notEmpty()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('username must have at least 3 characters'),
    check("password").notEmpty()
        .withMessage('password is required')
        .isLength({ min: 4 })
        .withMessage('password must be at least 4 characters')],addUser)

module.exports = router