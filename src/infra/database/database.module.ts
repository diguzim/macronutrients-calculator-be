import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RawIngredientSchema from './mongoose/schemas/raw-ingredient.schema';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { InMemoryRawIngredientRepository } from './in-memory/repositories/in-memory-raw-ingredient.repository';
import { CookedIngredientRepository } from '../../@core/domain/cooked-ingredient/cooked-ingredient.repository';
import { InMemoryCookedIngredientRepository } from './in-memory/repositories/in-memory-cooked-ingredient.repository';
import { MongooseRawIngredientRepository } from './mongoose/repositories/mongoose-raw-ingredient.repository';
import { CookedDishRepository } from '../../@core/domain/cooked-dish/cooked-dish.repository';
import { InMemoryCookedDishRepository } from './in-memory/repositories/in-memory-cooked-dish.repository';

const inMemoryProviders = [
  {
    provide: RawIngredientRepository,
    useClass: InMemoryRawIngredientRepository,
  },
  {
    provide: CookedIngredientRepository,
    useClass: InMemoryCookedIngredientRepository,
  },
  {
    provide: CookedDishRepository,
    useClass: InMemoryCookedDishRepository,
  },
];

const mongooseProviders = [
  {
    provide: RawIngredientRepository,
    useFactory: (rawIngredientModel) =>
      new MongooseRawIngredientRepository(rawIngredientModel),
    inject: ['RawIngredientModel'],
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawIngredient.name, schema: RawIngredientSchema },
    ]),
  ],
  providers: [
    // Have this uncommented to use the mongoose database
    // ...mongooseProviders,

    // Have this uncommented to use the in-memory database
    ...inMemoryProviders,
  ],
  exports: [
    RawIngredientRepository,
    CookedIngredientRepository,
    CookedDishRepository,
  ],
})
export class DatabaseModule {}
