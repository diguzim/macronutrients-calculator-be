import { Body, Controller, Post } from '@nestjs/common';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../../../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { RawIngredientSerializer } from '../../../../utils/serializers/raw-ingredient.serializer';
import { CreateRawIngredientDto } from './dto/create.dto';

@Controller('raw-ingredients')
export class RawIngredientsController {
  constructor(
    private createRawIngredientFromAbsoluteValuesUseCase: CreateRawIngredientFromAbsoluteValuesUseCase,
  ) {}

  @Post()
  async create(@Body() createRawIngredientDto: CreateRawIngredientDto) {
    const rawIngredient =
      await this.createRawIngredientFromAbsoluteValuesUseCase.execute(
        createRawIngredientDto,
      );

    return RawIngredientSerializer.serialize(rawIngredient);
  }
}
