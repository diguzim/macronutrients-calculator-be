import { Module } from '@nestjs/common';
import { RawIngredientsController } from './raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RawIngredientsController],
  providers: [CreateRawIngredientFromAbsoluteValuesUseCase],
})
export class RawIngredientsModule {}
