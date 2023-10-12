import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RawIngredientSchema from './mongoose/schemas/raw-ingredient.schema';
import { MongooseRawIngredientRepository } from './mongoose/repositories/mongoose-raw-ingredient.repository';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../@core/domain/raw-ingredient/raw-ingredient.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawIngredient.name, schema: RawIngredientSchema },
    ]),
  ],
  providers: [
    {
      provide: RawIngredientRepository,
      useFactory: (rawIngredientModel) =>
        new MongooseRawIngredientRepository(rawIngredientModel),
      inject: ['RawIngredientModel'],
    },

    // Uncomment this to use the in-memory repository
    // {
    //   provide: RawIngredientRepository,
    //   useClass: InMemoryRawIngredientRepository,
    // },
  ],
  exports: [RawIngredientRepository],
})
export class DatabaseModule {}
