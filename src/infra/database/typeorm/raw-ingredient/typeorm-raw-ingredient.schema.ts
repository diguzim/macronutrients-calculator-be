import { EntitySchema } from 'typeorm';
import { RawIngredient } from '../../../../core/domain/raw-ingredient/raw-ingredient.entity';

export const RawIngredientSchema = new EntitySchema<RawIngredient>({
  name: 'RawIngredient',
  tableName: 'raw_ingredients',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    proteinRatio: {
      type: Number,
    },
    fatRatio: {
      type: Number,
    },
    carbohydrateRatio: {
      type: Number,
    },
    fiberRatio: {
      type: Number,
    },
    kcalPerGram: {
      type: Number,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
});
