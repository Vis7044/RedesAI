// nodeBackend/dbConnect/dbConnect.js
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const port = process.env.PORT;
        const MongoURL = process.env.MONGO_URI;
        
        await mongoose.connect(MongoURL);
        console.log('database connected');
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;
