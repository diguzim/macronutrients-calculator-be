import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RawIngredientSchema from './mongoose/schemas/raw-ingredient.schema';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { InMemoryRawIngredientRepository } from './in-memory/repositories/in-memory-raw-ingredient.repository';
import { MongooseRawIngredientRepository } from './mongoose/repositories/mongoose-raw-ingredient.repository';
import { CookedDishRepository } from '../../@core/domain/cooked-dish/cooked-dish.repository';
import { InMemoryCookedDishRepository } from './in-memory/repositories/in-memory-cooked-dish.repository';
import { MongooseCookedDishRepository } from './mongoose/repositories/mongoose-cooked-dish.repository';
import { CookedDish } from '../../@core/domain/cooked-dish/cooked-dish.entity';
import CookedDishSchema from './mongoose/schemas/cooked-dish.schema';

const inMemoryProviders: Provider[] = [
  {
    provide: RawIngredientRepository,
    useClass: InMemoryRawIngredientRepository,
  },
  {
    provide: CookedDishRepository,
    useClass: InMemoryCookedDishRepository,
  },
];

const mongooseProviders: Provider[] = [
  {
    provide: RawIngredientRepository,
    useFactory: (rawIngredientModel) =>
      new MongooseRawIngredientRepository(rawIngredientModel),
    inject: ['RawIngredientModel'],
  },
  {
    provide: CookedDishRepository,
    useFactory: (cookedDishModel) =>
      new MongooseCookedDishRepository(cookedDishModel),
    inject: ['CookedDishModel'],
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawIngredient.name, schema: RawIngredientSchema },
      { name: CookedDish.name, schema: CookedDishSchema },
    ]),
  ],
  providers: [
    // Have this uncommented to use the mongoose database
    ...mongooseProviders,

    // Have this uncommented to use the in-memory database
    // ...inMemoryProviders,
  ],
  exports: [RawIngredientRepository, CookedDishRepository],
})
export class DatabaseModule {}
