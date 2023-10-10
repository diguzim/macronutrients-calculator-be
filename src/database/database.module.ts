import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RawIngredientRepository } from '../@core/domain/raw-ingredient/raw-ingredient.repository';
import { PrismaRawIngredientRepository } from './prisma/repositories/prisma-raw-ingredient.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RawIngredientRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaRawIngredientRepository(prismaService);
      },
      inject: [PrismaService],
    },
  ],
  exports: [
    PrismaService,
    {
      provide: RawIngredientRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaRawIngredientRepository(prismaService);
      },
      inject: [PrismaService],
    },
  ],
})
export class DatabaseModule {}
