import { EntitySchema } from 'typeorm';
import { CookedDish } from '../../../../@core/domain/cooked-dish/cooked-dish.entity';

export const CookedDishSchema = new EntitySchema<CookedDish>({
  name: 'CookedDish',
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
