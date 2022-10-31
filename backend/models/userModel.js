const { mongoose, Schema } = require('mongoose')

require('dotenv').config()


const db_url = process.env.DB_URL 

mongoose.connect(db_url)
    .then(() => {
        console.log("connexion done!")
    })
    .catch( err => { 
        console.log("error: " + err)
    })

const userSchema = new Schema({
    
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel