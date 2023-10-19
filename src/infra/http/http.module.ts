import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { CookedIngredientsController } from './controllers/cooked-ingredients/cooked-ingredients.controller';
import { CreateCookedIngredientFromRawIngredientUseCase } from '../../@core/application/cooked_ingredient/create-cooked-ingredient-from-raw-ingredient.use-case';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../@core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';
import { CookedDishesController } from './controllers/cooked-dishes/cooked-dishes.controller';
import { CalculateNutritionalValuesController } from './controllers/calculate-nutritional-values/calculate-nutritional-values.controller';
import { CalculateNutritionalValuesUseCase } from '../../@core/application/nutritional_values/calculate-nutritional-values.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    RawIngredientsController,
    CookedIngredientsController,
    CookedDishesController,
    CalculateNutritionalValuesController,
  ],
  providers: [
    CreateRawIngredientFromAbsoluteValuesUseCase,
    CreateCookedIngredientFromRawIngredientUseCase,
    CreateCookedDishFromRawIngredientsUseCase,
    CalculateNutritionalValuesUseCase,
  ],
})
export class HttpModule {}
