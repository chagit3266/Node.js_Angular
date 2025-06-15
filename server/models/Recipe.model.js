import { model, Schema } from "mongoose";

const recipeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: [{
        _id: { type: Schema.Types.ObjectId, ref: 'category' },
        description: String
    }],
    preparationTime: { type: Number, required: true },
    difficultyLevel: { type: Number, min: 1, max: 5, required: true },
    layers: [{
        description: { type: String },
        ingredients: [{ type: String }]
    }],
    prepSteps: [{ type: String }],
    img: { type: String },
    isPrivate: { type: Boolean, default: false },
    owner: {
        _id: { type: Schema.Types.ObjectId, ref: 'users' },
        name: String
    },
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
})

export default model("recipe", recipeSchema)