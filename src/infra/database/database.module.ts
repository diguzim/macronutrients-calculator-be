import { Module, Provider } from '@nestjs/common';
// import { InMemoryRawIngredientRepository } from './in-memory/repositories/in-memory-raw-ingredient.repository';
// import { InMemoryCookedDishRepository } from './in-memory/repositories/in-memory-cooked-dish.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseRawIngredientRepository } from './mongoose/repositories/mongoose-raw-ingredient.repository';
// import { MongooseCookedDishRepository } from './mongoose/repositories/mongoose-cooked-dish.repository';
import { ItemRepository } from '../../core/domain/item/item.repository';
import { MealRepository } from '../../core/domain/meal/meal.repository';
import { UserRepository } from '../../core/domain/user/user.repository';
import { TypeormItemRepository } from './typeorm/entities/item/typeorm-item.repository';
import { ItemSchema } from './typeorm/entities/item/typeorm-item.schema';
import { TypeormMealRepository } from './typeorm/entities/meal/typeorm-meal.repository';
import { MealSchema } from './typeorm/entities/meal/typeorm-meal.schema';
import { TypeormUserRepository } from './typeorm/entities/user/typeorm-user.repository';
import { UserSchema } from './typeorm/entities/user/typeorm-user.schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const inMemoryProviders: Provider[] = [
//   {
//     provide: RawIngredientRepository,
//     useClass: InMemoryRawIngredientRepository,
//   },
//   {
//     provide: CookedDishRepository,
//     useClass: InMemoryCookedDishRepository,
//   },
// ];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const mongooseProviders: Provider[] = [
//   {
//     provide: RawIngredientRepository,
//     useFactory: (rawIngredientModel) =>
//       new MongooseRawIngredientRepository(rawIngredientModel),
//     inject: ['RawIngredientModel'],
//   },
//   {
//     provide: CookedDishRepository,
//     useFactory: (cookedDishModel) =>
//       new MongooseCookedDishRepository(cookedDishModel),
//     inject: ['CookedDishModel'],
//   },
// ];

const typeormProviders: Provider[] = [
  {
    provide: ItemRepository,
    useFactory: (dataSource) => {
      const repository = dataSource.getRepository(ItemSchema);
      return new TypeormItemRepository(repository);
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: UserRepository,
    useFactory: (dataSource) => {
      const repository = dataSource.getRepository(UserSchema);
      return new TypeormUserRepository(repository);
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: MealRepository,
    useFactory: (dataSource) => {
      const repository = dataSource.getRepository(MealSchema);
      return new TypeormMealRepository(repository);
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
        ssl: false,
        host: configService.getOrThrow('database.host'),
        port: configService.getOrThrow('database.port'),
        database: configService.getOrThrow('database.name'),
        username: configService.getOrThrow('database.username'),
        password: configService.getOrThrow('database.password'),
        synchronize: false,
        entities: [ItemSchema, UserSchema, MealSchema],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    // Have this uncommented to use the typeorm database
    ...typeormProviders,

    // Have this uncommented to use the in-memory database
    // ...inMemoryProviders,
  ],
  exports: [ItemRepository, UserRepository, MealRepository],
})
export class DatabaseModule {}
