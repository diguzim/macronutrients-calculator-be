import { EntitySchema } from 'typeorm';
import { RawIngredient } from '../../../../@core/domain/raw-ingredient/raw-ingredient.entity';

export const RawIngredientSchema = new EntitySchema<RawIngredient>({
  name: 'RawIngredient',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    protein_ratio: {
      type: Number,
    },
    fat_ratio: {
      type: Number,
    },
    carbohydrate_ratio: {
      type: Number,
    },
    fiber_ratio: {
      type: Number,
    },
    kcal_per_gram: {
      type: Number,
    },
  },
});
