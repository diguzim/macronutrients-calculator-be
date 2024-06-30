import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { CookedDishesController } from './controllers/cooked-dishes/cooked-dishes.controller';
import { CreateCookedDishFromRawIngredientsUseCase } from '../../core/application/cooked_dish/create-cooked-dish-from-raw-ingredients.use-case';
import { NutritionalEntitiesController } from './controllers/nutritional-entities/nutritional-entities.controller';
import { GetAllNutritionalEntitiesUseCase } from '../../core/application/nutritional_entity/get-all-nutritional-entities.use-case';
import { ItemsController } from './controllers/items/items.controller';
import { CreateItemFromRatiosUseCase } from '../../core/application/item/create-item-from-ratios.use-case';
import { CreateItemFromAbsoluteValuesUseCase } from '../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateCompositeItemUseCase } from '../../core/application/item/create-composite-item.use-case';
import { GetItemsUseCase } from '../../core/application/item/get-items.use-case';
import { CalculateNutritionalValuesUseCase } from '../../core/application/item/calculate-nutritional-values.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    RawIngredientsController,
    CookedDishesController,
    NutritionalEntitiesController,
    ItemsController,
  ],
  providers: [
    CreateRawIngredientFromAbsoluteValuesUseCase,
    CreateCookedDishFromRawIngredientsUseCase,
    GetAllNutritionalEntitiesUseCase,
    CreateItemFromRatiosUseCase,
    CreateItemFromAbsoluteValuesUseCase,
    CreateCompositeItemUseCase,
    GetItemsUseCase,
    CalculateNutritionalValuesUseCase,
  ],
})
export class HttpModule {}
