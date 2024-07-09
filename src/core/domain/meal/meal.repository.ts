import { Meal } from './meal.entity';

export abstract class MealRepository {
  abstract create(item: Meal): Promise<Meal>;
  abstract findBy(params: Partial<Meal>): Promise<Meal | null>;
}
