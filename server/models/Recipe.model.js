import { model, Schema } from "mongoose";

const recipeSchema = new Schema({
    name: { type: String ,required: true},
    description: {type: String},
    category:{}
})

export default model("recipe", recipeSchema)