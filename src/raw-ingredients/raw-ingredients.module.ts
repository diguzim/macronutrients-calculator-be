import { Module } from '@nestjs/common';
import { RawIngredientsController } from './raw-ingredients.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [RawIngredientsController],
  providers: [CreateRawIngredientFromAbsoluteValuesUseCase],
})
export class RawIngredientsModule {}
