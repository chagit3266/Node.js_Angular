import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  code: { type: String },
  description: { type: String },
  recipes: [{
    _id: { type: Schema.Types.ObjectId, ref: 'recipes' },
    name: String
  }],
})
// פונקציה שתחשב כמות מתכונים לקטגוריה 
categorySchema.virtual('recipeCount').get(function () {
  return this.recipes.length;
});

export default model("category", categorySchema)