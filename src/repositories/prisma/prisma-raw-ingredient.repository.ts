import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { IRawIngredientRepository } from '../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { PrismaService } from '../../prisma/prisma.service';

export class PrismaRawIngredientRepository implements IRawIngredientRepository {
  constructor(private prismaService: PrismaService) {}

  async insert(rawIngredient: RawIngredient): Promise<any> {
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
