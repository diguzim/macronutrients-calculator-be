import { RawIngredient } from '../../../core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../../core/domain/raw-ingredient/raw-ingredient.repository';

export class mockedRawIngredientRepository implements RawIngredientRepository {
  async create(rawIngredient: RawIngredient): Promise<RawIngredient> {
    return rawIngredient;
  }

  async findBy(): Promise<RawIngredient | null> {
    return null;
  }

  async findAllBy(): Promise<RawIngredient[]> {
    return [];
  }
}
