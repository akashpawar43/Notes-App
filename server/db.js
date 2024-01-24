const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

const connectToMongo = async () => {
    try {
        mongoose.connect(mongoURL);
        console.log("Connected to mongo Successfully")
    } catch(error) {
        console.log(error)
    }
}

module.exports = connectToMongo;