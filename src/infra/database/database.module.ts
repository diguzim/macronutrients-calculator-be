import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RawIngredientSchema from './mongoose/schemas/raw-ingredient.schema';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { InMemoryRawIngredientRepository } from './in-memory/repositories/in-memory-raw-ingredient.repository';
import { CookedIngredientRepository } from '../../@core/domain/cooked-ingredient/cooked-ingredient.repository';
import { InMemoryCookedIngredientRepository } from './in-memory/repositories/in-memory-cooked-ingredient.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawIngredient.name, schema: RawIngredientSchema },
    ]),
  ],
  providers: [
    // {
    //   provide: RawIngredientRepository,
    //   useFactory: (rawIngredientModel) =>
    //     new MongooseRawIngredientRepository(rawIngredientModel),
    //   inject: ['RawIngredientModel'],
    // },

    // Uncomment this to use the in-memory repository
    {
      provide: RawIngredientRepository,
      useClass: InMemoryRawIngredientRepository,
    },
    {
      provide: CookedIngredientRepository,
      useClass: InMemoryCookedIngredientRepository,
    },
  ],
  exports: [RawIngredientRepository, CookedIngredientRepository],
})
export class DatabaseModule {}
