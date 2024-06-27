import { Module, Provider } from '@nestjs/common';
import { RawIngredientRepository } from '../../core/domain/raw-ingredient/raw-ingredient.repository';
import { InMemoryRawIngredientRepository } from './in-memory/repositories/in-memory-raw-ingredient.repository';
import { CookedDishRepository } from '../../core/domain/cooked-dish/cooked-dish.repository';
import { InMemoryCookedDishRepository } from './in-memory/repositories/in-memory-cooked-dish.repository';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RawIngredientSchema } from './typeorm/entities/raw-ingredient/typeorm-raw-ingredient.schema';
import { TypeormRawIngredientRepository } from './typeorm/entities/raw-ingredient/typeorm-raw-ingredient.repository';
import { CookedDishSchema } from './typeorm/entities/cooked-dish/typeorm-cooked-dish.schema';
import { TypeormCookedDishRepository } from './typeorm/entities/cooked-dish/typeorm-cooked-dish.repository';
import { MongooseRawIngredientRepository } from './mongoose/repositories/mongoose-raw-ingredient.repository';
import { MongooseCookedDishRepository } from './mongoose/repositories/mongoose-cooked-dish.repository';
import { ItemSchema } from './typeorm/entities/item/typeorm-item.schema';
import { ItemRepository } from '../../core/domain/item/item.repository';
import { TypeormItemRepository } from './typeorm/entities/item/typeorm-item.repository';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const typeormProviders: Provider[] = [
  {
    provide: RawIngredientRepository,
    useFactory: (dataSource) => {
      const repository = dataSource.getRepository(RawIngredientSchema);
      return new TypeormRawIngredientRepository(repository);
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CookedDishRepository,
    useFactory: (dataSource) => {
      const repository = dataSource.getRepository(CookedDishSchema);
      return new TypeormCookedDishRepository(repository);
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ItemRepository,
    useFactory: (dataSource) => {
      const repository = dataSource.getRepository(ItemSchema);
      return new TypeormItemRepository(repository);
    },
    inject: [getDataSourceToken()],
  },
];

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: RawIngredient.name, schema: RawIngredientSchema },
    //   { name: CookedDish.name, schema: CookedDishSchema },
    // ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('database.host'),
        port: configService.getOrThrow('database.port'),
        database: configService.getOrThrow('database.name'),
        username: configService.getOrThrow('database.username'),
        password: configService.getOrThrow('database.password'),
        synchronize: false,
        entities: [RawIngredientSchema, CookedDishSchema, ItemSchema],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    // Have this uncommented to use the mongoose database
    ...typeormProviders,

    // Have this uncommented to use the in-memory database
    // ...inMemoryProviders,
  ],
  exports: [RawIngredientRepository, CookedDishRepository, ItemRepository],
})
export class DatabaseModule {}
