import { Schema } from 'mongoose';

const RawIngredientSchema = new Schema({
  name: String,
  proteinRatio: Number,
  fatRatio: Number,
  carbohydrateRatio: Number,
  fiberRatio: Number,
  kcalPerGram: Number,
});
