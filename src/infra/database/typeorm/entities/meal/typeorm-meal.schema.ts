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
    userId: {
      type: String,
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
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      onDelete: 'CASCADE',
      lazy: true,
    },
  },
});
