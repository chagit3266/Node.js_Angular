import mongoose from "mongoose";

export const connectDB = async () => {
    const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1/storeDB';
    try {
        await mongoose.connect(DB_URL)
    } catch (error) {
        
    }
}