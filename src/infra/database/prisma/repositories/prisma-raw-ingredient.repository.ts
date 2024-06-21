import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RawIngredientRepository } from '../../../../core/domain/raw-ingredient/raw-ingredient.repository';
import { RawIngredient } from '../../../../core/domain/raw-ingredient/raw-ingredient.entity';

@Injectable()
export class PrismaRawIngredientRepository implements RawIngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(rawIngredient: RawIngredient): Promise<any> {}

  async findBy(params: Partial<RawIngredient>): Promise<RawIngredient | null> {
    return null;
  }
}
