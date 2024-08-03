import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateMealFromItemsUseCase } from '../../../../core/application/meal/create-meal-from-items.use-case';
import { GetMealsUseCase } from '../../../../core/application/meal/get-meals.use-case';
import { JwtAuthGuard } from '../../../../utils/guards/jwt-auth.guard';
import { MealSerializer } from '../../../../utils/serializers/meal.serializer';
import { CreateMealFromItemsDto } from './dtos/create-meal-from-items.dto';
import { GetMealsDto } from './dtos/get-meals.dto';

@Controller('meals')
export class MealsController {
  constructor(
    private readonly createMealFromItemsUseCase: CreateMealFromItemsUseCase,
    private readonly getMealsUseCase: GetMealsUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMeals(@Body() getMealsDto: GetMealsDto, @Request() req) {
    const meals = await this.getMealsUseCase.execute(
      getMealsDto,
      req.user.userId,
    );

    return meals.map(MealSerializer.serialize);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-from-items')
  async createMealFromItems(
    @Body() createMealDto: CreateMealFromItemsDto,
    @Request() req,
  ) {
    const meal = await this.createMealFromItemsUseCase.execute({
      ...createMealDto,
      userId: req.user.userId,
    });

    return MealSerializer.serialize(meal);
  }
}
