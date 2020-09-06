const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        fullName: {type: String},
        email: {type: String},
        password: {type: String},
        role: {type: String},
    }
)

module.exports = mongoose.model('users', User)