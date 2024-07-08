import { Body, Controller, Post } from '@nestjs/common';
import { CreateMealFromItemsUseCase } from '../../../../core/application/meal/create-meal-from-items.use-case';
import { CreateMealFromItemsDto } from './dtos/create-meal-from-items.dto';
import { MealSerializer } from '../../../../utils/serializers/meal.serializer';

@Controller('meals')
export class MealsController {
  constructor(
    private readonly createMealFromItemsUseCase: CreateMealFromItemsUseCase,
  ) {}

  @Post('create-from-items')
  async createMealFromItems(@Body() createMealDto: CreateMealFromItemsDto) {
    const meal = await this.createMealFromItemsUseCase.execute(createMealDto);

    return MealSerializer.serialize(meal);
  }
}
