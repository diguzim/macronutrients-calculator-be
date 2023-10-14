import { Body, Controller, Post } from '@nestjs/common';
import { CreateCookedIngredientFromRawIngredientUseCase } from '../../../../@core/application/cooked_ingredient/create-cooked-ingredient-from-raw-ingredient.use-case';
import { CookedIngredientSerializer } from '../../../../utils/serializers/cooked-ingredient.serializer';

@Controller('cooked-ingredients')
export class CookedIngredientsController {
  constructor(
    private createCookedIngredientFromRawIngredientUseCase: CreateCookedIngredientFromRawIngredientUseCase,
  ) {}

  @Post()
  async create(@Body() params: any) {
    const cookedIngredient =
      await this.createCookedIngredientFromRawIngredientUseCase.execute({
        raw_ingredient_id: params.raw_ingredient_id,
        name: params.name,
        initialWeightInGrams: params.initialWeightInGrams,
        finalWeightInGrams: params.finalWeightInGrams,
      });

    return CookedIngredientSerializer.serialize(cookedIngredient);
  }
}
