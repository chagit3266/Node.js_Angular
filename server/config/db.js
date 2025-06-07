import mongoose from "mongoose";

export const connectDB = async () => {
    const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1/storeDB';
    try {
        await mongoose.connect(DB_URL)
        console.log(`Mongo Connect to ${DB_URI}`);
    } catch (error) {
        console.log('Mongo Error', error.message);
        process.exit();
    }
}