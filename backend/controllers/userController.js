const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

const { validationResult } = require('express-validator')




const addUser = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            errors : errors.array()
        })
    } else {
      
        let newUser = new User(req.body)

        newUser.save()
            .then(() => {
                res.status(201).json({ "message": "user added successfully" })
            })
            .catch(err => {
                res.status(400).json({ "message": "error creating user " + err.message })
            })
    }
  
}

const login = (req, res) => {

    User.findOne({ username: req.body.username})
        .then((user) => { 
           if (!user) {
             console.log("User not found")
           }
            if (req.body.password !== user.password) {
                console.log("Password incorrect")
            } else {
                const payload = {
                    username: user.username,
                    id: user._id
                }
                const token = jwt.sign(payload, "mykey", { expiresIn: "1d" })
                return res.status(200).json({
                    message: "login successfully",
                    token: "Bearer " + token
                })
            }

        
            
        })
      
        .catch(err => { 
            console.log("error: " + err)
        })
}

const secretRoute = (req, res) => { 
    
    return res.status(200).send({
        user: {
            id: req.user._id,
            username: req.user.username
            }
    })
}

module.exports = {
    addUser,
    login,
    secretRoute
}