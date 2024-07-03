import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemsController } from './controllers/items/items.controller';
import { CreateItemFromRatiosUseCase } from '../../core/application/item/create-item-from-ratios.use-case';
import { CreateItemFromAbsoluteValuesUseCase } from '../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateCompositeItemUseCase } from '../../core/application/item/create-composite-item.use-case';
import { GetItemsUseCase } from '../../core/application/item/get-items.use-case';
import { CalculateNutritionalValuesUseCase } from '../../core/application/item/calculate-nutritional-values.use-case';
import { RegisterUseCase } from '../../core/application/authentication/register.use-case';
import { AuthenticationController } from './controllers/authentication/authentication.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemsController, AuthenticationController],
  providers: [
    CreateItemFromRatiosUseCase,
    CreateItemFromAbsoluteValuesUseCase,
    CreateCompositeItemUseCase,
    GetItemsUseCase,
    CalculateNutritionalValuesUseCase,
    RegisterUseCase,
  ],
})
export class HttpModule {}
