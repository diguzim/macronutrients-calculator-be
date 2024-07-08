import { EntitySchema } from 'typeorm';
import { Meal } from '../../../../../core/domain/meal/meal.entity';

export const MealSchema = new EntitySchema<Meal>({
  name: 'Meal',
  tableName: 'meals',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    protein: {
      type: 'float',
    },
    fat: {
      type: 'float',
    },
    carbohydrate: {
      type: 'float',
    },
    fiber: {
      type: 'float',
    },
    kcal: {
      type: 'float',
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
