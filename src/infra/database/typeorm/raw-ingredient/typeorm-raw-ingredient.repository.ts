import { Repository } from 'typeorm';

import { RawIngredient } from '../../../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../../../@core/domain/raw-ingredient/raw-ingredient.repository';

export class TypeormRawIngredientRepository implements RawIngredientRepository {
  constructor(
    private readonly rawIngredientRepository: Repository<RawIngredient>,
  ) {}

  async insert(rawIngredient: RawIngredient): Promise<RawIngredient> {
    return this.rawIngredientRepository.save(rawIngredient);
  }

  async findAll(): Promise<RawIngredient[]> {
    return this.rawIngredientRepository.find();
  }

  async findOne(id: string): Promise<RawIngredient | null> {
    return this.rawIngredientRepository.findOneBy({ id });
  }

  async update(rawIngredient: RawIngredient): Promise<void> {
    await this.rawIngredientRepository.save(rawIngredient);
  }

  async delete(id: string): Promise<void> {
    await this.rawIngredientRepository.delete(id);
  }
}
