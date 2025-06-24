import Joi from 'joi';
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
    const seq = await getNextSequence('categoryCode');
    this.code = 'CAT' + seq.toString().padStart(6, '0');
  }
});


export const JoiCategorySchema={
  create: Joi.object({
    description: Joi.string().min(2).required(),
    recipes: Joi.array().items(
      Joi.object({
        _id: Joi.string().hex().length(24).required(),
        name: Joi.string().required()
      })
    ).optional(),
  }),
  // update: Joi.object({
  //   recipes: Joi.array().items(
  //     Joi.object({
  //       _id: Joi.string().hex().length(24).required(),
  //       name: Joi.string().required()
  //     })
  //   ).required(),
  // }),
  reference: Joi.object({
    code: Joi.string().pattern(/^CAT\d{6}$/).required(),
    name: Joi.string().min(2).optional()
  }),
  recipeRef: Joi.object({
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).required()
  }),
}

export default model("category", categorySchema)