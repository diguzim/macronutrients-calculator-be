import { RawIngredient } from '../../../core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../../core/domain/raw-ingredient/raw-ingredient.repository';

export class mockedRawIngredientRepository implements RawIngredientRepository {
  async create(rawIngredient: RawIngredient): Promise<RawIngredient> {
    return rawIngredient;
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
