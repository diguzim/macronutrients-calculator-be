import { Schema } from 'mongoose';

const CookedDishSchema = new Schema({
  name: String,
  proteinRatio: Number,
  fatRatio: Number,
  carbohydrateRatio: Number,
  fiberRatio: Number,
  kcalPerGram: Number,
});
