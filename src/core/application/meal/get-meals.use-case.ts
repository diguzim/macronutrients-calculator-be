import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../domain/meal/meal.repository';
import { Meal } from '../../domain/meal/meal.entity';

@Injectable()
export class GetMealsUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(params: Omit<Partial<Meal>, 'userId'> = {}, userId: string) {
    return await this.mealRepository.findAllBy({
      ...params,
      userId,
    });
  }
}
