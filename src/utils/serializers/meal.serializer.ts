import { Meal } from '../../core/domain/meal/meal.entity';

export class MealSerializer {
  public static serialize(meal: Meal) {
    return {
      id: meal.id,
      ...meal,
    };
  }
}
