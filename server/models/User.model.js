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

const passwordValidation = Joi.string()
    .min(8)
    .messages({
        'string.min': 'Password must be at least 8 characters long'
    })
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\d]).+$'))
    .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');

export const JoiUserSchema = {
    signUp: Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: passwordValidation.required(),
        address: Joi.string().required(),
        role: Joi.string().valid('user', 'admin'),
    }),

    signIn: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    update: Joi.object({
        password: passwordValidation.required(),
    })
}

export default model("user", userSchema)