import { Controller, Post } from '@nestjs/common';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { RawIngredientSerializer } from '../common/serializers/raw-ingredient.serializer';

@Controller('raw-ingredients')
export class RawIngredientsController {
  constructor(
    private createRawIngredientFromAbsoluteValuesUseCase: CreateRawIngredientFromAbsoluteValuesUseCase,
  ) {}

  @Post()
  async create() {
    const rawIngredient =
      await this.createRawIngredientFromAbsoluteValuesUseCase.execute({
        name: 'Raw ingredient name',
        weight: 100,
        protein: 10,
        fat: 10,
        carbohydrate: 10,
        fiber: 10,
        kcal: 10,
      });

    return RawIngredientSerializer.serialize(rawIngredient);
  }
}
