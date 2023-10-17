import { Body, Controller, Post } from '@nestjs/common';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../../../@core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';
import { CreateCookedDishFromRawIngredientsDto } from './dto/create.dto';

@Controller('cooked-dishes')
export class CookedDishesController {
  constructor(
    private createCookedDishFromRawIngredientsUseCase: CreateCookedDishFromRawIngredientsUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    createCookedDishFromRawIngredientsDto: CreateCookedDishFromRawIngredientsDto,
  ) {
    console.log('HELLO WORLD!');
    const cookedDish =
      await this.createCookedDishFromRawIngredientsUseCase.execute(
        createCookedDishFromRawIngredientsDto,
      );

    return cookedDish;
  }
}
