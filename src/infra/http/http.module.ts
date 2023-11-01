import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../@core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';
import { CookedDishesController } from './controllers/cooked-dishes/cooked-dishes.controller';
import { NutritionalEntitiesController } from './controllers/nutritional-entities/nutritional-entities.controller';
import { CalculateNutritionalValuesUseCase } from '../../@core/application/nutritional_entity/calculate-nutritional-values.use-case';
import { GetAllNutritionalEntitiesUseCase } from '../../@core/application/nutritional_entity/get-all-nutritional-entities.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    RawIngredientsController,
    CookedDishesController,
    NutritionalEntitiesController,
  ],
  providers: [
    CreateRawIngredientFromAbsoluteValuesUseCase,
    CreateCookedDishFromRawIngredientsUseCase,
    CalculateNutritionalValuesUseCase,
    GetAllNutritionalEntitiesUseCase,
  ],
})
export class HttpModule {}
