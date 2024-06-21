import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { CookedDishesController } from './controllers/cooked-dishes/cooked-dishes.controller';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [RawIngredientsController, CookedDishesController],
  providers: [
    CreateRawIngredientFromAbsoluteValuesUseCase,
    CreateCookedDishFromRawIngredientsUseCase,
  ],
})
export class HttpModule {}
