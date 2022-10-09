const { mongoose, Schema } = require('mongoose')


db_url = "mongodb+srv://mesch:mandA1234@cluster0.crwrkvz.mongodb.net/app-chatting?retryWrites=true&w=majority"

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
    },
    confirmPassword: {
        type: String
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel