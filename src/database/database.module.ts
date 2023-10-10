import { Module } from '@nestjs/common';
import { RawIngredientRepository } from '../@core/domain/raw-ingredient/raw-ingredient.repository';
import { InMemoryRawIngredientRepository } from './in-memory/repositories/in-memory-raw-ingredient.repository';

@Module({
  providers: [
    {
      provide: RawIngredientRepository,
      useClass: InMemoryRawIngredientRepository,
    },
  ],
  exports: [
    {
      provide: RawIngredientRepository,
      useClass: InMemoryRawIngredientRepository,
    },
  ],
})
export class DatabaseModule {}
