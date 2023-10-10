import { Injectable } from '@nestjs/common';
import { RawIngredient } from '../../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRawIngredientRepository implements RawIngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async insert(rawIngredient: RawIngredient): Promise<any> {
    console.log('prismaService', this.prismaService);
    console.log('insert on Repository');
  }

  async findAll(): Promise<RawIngredient[]> {
    return [];
  }

  async findOne(id: string): Promise<RawIngredient | null> {
    return null;
  }

  async update(rawIngredient: RawIngredient): Promise<void> {
    return;
  }

  async delete(id: string): Promise<void> {
    return;
  }
}
