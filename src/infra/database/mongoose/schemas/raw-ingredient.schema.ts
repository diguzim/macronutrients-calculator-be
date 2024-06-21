import { Schema } from 'mongoose';

export const RawIngredientSchema = new Schema({
  name: String,
  proteinRatio: Number,
  fatRatio: Number,
  carbohydrateRatio: Number,
  fiberRatio: Number,
  kcalPerGram: Number,
});
