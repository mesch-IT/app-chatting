const User = require('../models/userModel')

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

module.exports = {
    addUser
}