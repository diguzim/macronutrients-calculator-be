import { Module } from '@nestjs/common';
import { RawIngredientsController } from './raw-ingredients.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';
import { RawIngredientRepository } from '../@core/domain/raw-ingredient/raw-ingredient.repository';
import { PrismaRawIngredientRepository } from '../database/prisma/repositories/prisma-raw-ingredient.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RawIngredientsController],
  providers: [
    {
      provide: RawIngredientRepository,
      useFactory: (prismaService) => {
        return new PrismaRawIngredientRepository(prismaService);
      },
    },
    CreateRawIngredientFromAbsoluteValuesUseCase,
  ],
})
export class RawIngredientsModule {}
