import { Repository } from 'typeorm';
import { MealRepository } from '../../../../../core/domain/meal/meal.repository';
import { Meal } from '../../../../../core/domain/meal/meal.entity';

export class TypeormMealRepository implements MealRepository {
  constructor(private readonly mealRepository: Repository<Meal>) {}

  async create(meal: Meal): Promise<Meal> {
    return this.mealRepository.save(meal);
  }
}
