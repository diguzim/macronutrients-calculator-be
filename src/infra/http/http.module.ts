import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { CookedDishesController } from './controllers/cooked-dishes/cooked-dishes.controller';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';
import { NutritionalEntitiesController } from './controllers/nutritional-entities/nutritional-entities.controller';
import { GetAllNutritionalEntitiesUseCase } from '../../core/application/nutritional_entity/get-all-nutritional-entities.use-case';

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
    GetAllNutritionalEntitiesUseCase,
  ],
})
export class HttpModule {}
