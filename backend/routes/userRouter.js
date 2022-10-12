const router = require('express').Router()
const { check} = require('express-validator')
const { addUser, login, secretRoute } = require('../controllers/userController')
const passport = require('passport')

require("../controllers/passport")


router.get("/users/home",passport.authenticate("jwt",{session : false}),secretRoute)

router.post("/users/login",login)

router.post("/users",[
    check("username").notEmpty()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('username must have at least 3 characters'),
    check("password").notEmpty()
        .withMessage('password is required')
        .isLength({ min: 4 })
        .withMessage('password must be at least 4 characters'),
    check("confirmPassword").notEmpty()
        .withMessage('confirm password is required')
],addUser)

module.exports = router