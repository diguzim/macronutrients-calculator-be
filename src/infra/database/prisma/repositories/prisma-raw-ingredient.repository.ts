import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RawIngredientRepository } from '../../../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { RawIngredient } from '../../../../@core/domain/raw-ingredient/raw-ingredient.entity';

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
