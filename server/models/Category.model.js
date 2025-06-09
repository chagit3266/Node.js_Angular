import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    code: { type: String },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    
})

export default model("category", categorySchema)