import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RawIngredientsController } from './controllers/raw-ingredients/raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [RawIngredientsController],
  providers: [CreateRawIngredientFromAbsoluteValuesUseCase],
})
export class HttpModule {}
