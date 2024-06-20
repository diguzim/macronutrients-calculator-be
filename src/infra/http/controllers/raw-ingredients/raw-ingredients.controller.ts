import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../../../core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { RawIngredientSerializer } from '../../../../utils/serializers/raw-ingredient.serializer';
import { CreateRawIngredientDto } from './dto/create.dto';
import { MacroNutrientRatioGreaterThanOneExceptionFilter } from '../../exception-filters';

@Controller('raw-ingredients')
export class RawIngredientsController {
  constructor(
    private createRawIngredientFromAbsoluteValuesUseCase: CreateRawIngredientFromAbsoluteValuesUseCase,
  ) {}

  @Post()
  @UseFilters(MacroNutrientRatioGreaterThanOneExceptionFilter)
  async create(@Body() createRawIngredientDto: CreateRawIngredientDto) {
    const rawIngredient =
      await this.createRawIngredientFromAbsoluteValuesUseCase.execute(
        createRawIngredientDto,
      );

    return RawIngredientSerializer.serialize(rawIngredient);
  }
}
