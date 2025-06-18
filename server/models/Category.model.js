import { model, Schema } from "mongoose";


const counterSchema = new Schema({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0 }
});
const Counter = model('Counter', counterSchema);

async function getNextSequence(name) {
    const counter = await Counter.findOneAndUpdate(
        { name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}


const categorySchema = new Schema({
  code: { type: String },
  description: { type: String },
  recipes: [{
    _id: { type: Schema.Types.ObjectId, ref: 'recipe' },
    name: String
  }],
})
// פונקציה שתחשב כמות מתכונים לקטגוריה 
// ותבנה קטגוריות חדשות אם עוד לא קיימות 
categorySchema.virtual('recipeCount').get(function () {
  return this.recipes.length;
});

categorySchema.pre('save', async function() {
  if (!this.code) {
    const seq = await getNextSequence('recipeCode');
    this.code = 'CAT' + seq.toString().padStart(6, '0');
  }
});

export default model("category", categorySchema)