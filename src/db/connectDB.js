const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('connecting to database');
        await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
        console.log('connected to database');
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDB;
