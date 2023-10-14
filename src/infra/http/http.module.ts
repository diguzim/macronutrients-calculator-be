import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { CookedIngredientsController } from './controllers/cooked-ingredients/cooked-ingredients.controller';
import { CreateCookedIngredientFromRawIngredientUseCase } from '../../@core/application/cooked_ingredient/create-cooked-ingredient-from-raw-ingredient.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [RawIngredientsController, CookedIngredientsController],
  providers: [
    CreateRawIngredientFromAbsoluteValuesUseCase,
    CreateCookedIngredientFromRawIngredientUseCase,
  ],
})
export class HttpModule {}
