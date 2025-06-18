import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from 'joi'
import { updatePassword } from "../controllers/user.controller";

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    address: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
})

export const generateToken = (user) => {
    const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        role: user.role,
    }, secretKey)
    return token
}

//פונקציה שמתבצעת לפני שמירה לממסד נתונים
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;// אם לא שונתה הסיסמה לא להצפין שוב
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})



export default model("user", userSchema)