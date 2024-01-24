const mongoose = require('mongoose');
// const { Schema } = mongoose; 

// creating user schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    date: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model("users", UserSchema);
module.exports = User;