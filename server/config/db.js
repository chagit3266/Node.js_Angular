import mongoose from "mongoose";

export const connectDB = async () => {
    const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1/storeDB';
    try {
        await mongoose.connect(DB_URL)
        console.log(`Mongo Connect to ${DB_URL}`);
    } catch (error) {
        console.log('Mongo Error', error.message);
        console.log(DB_URL);
        process.exit();
    }
}