import { Body, Controller, Post } from '@nestjs/common';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../../../@core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';
import { CreateCookedDishFromRawIngredientsDto } from './dto/create.dto';
import { CookedDishSerializer } from '../../../../utils/serializers/cooked-dish.serializer';

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
    const cookedDish =
      await this.createCookedDishFromRawIngredientsUseCase.execute(
        createCookedDishFromRawIngredientsDto,
      );

    return CookedDishSerializer.serialize(cookedDish);
  }
}
