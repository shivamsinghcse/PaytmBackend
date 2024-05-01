const mongoose = require('mongoose')
const {Schema} = mongoose
mongoose.connect('mongodb://localhost:27017/paytm')

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    password: String
})
 
const User = mongoose.model("User", UserSchema)
module.exports = User