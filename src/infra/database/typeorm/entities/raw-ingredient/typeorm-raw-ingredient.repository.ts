import { FindOptionsWhere, Repository } from 'typeorm';
import { RawIngredientRepository } from '../../../../../core/domain/raw-ingredient/raw-ingredient.repository';
import { RawIngredient } from '../../../../../core/domain/raw-ingredient/raw-ingredient.entity';

export class TypeormRawIngredientRepository implements RawIngredientRepository {
  constructor(
    private readonly rawIngredientRepository: Repository<RawIngredient>,
  ) {}

  async create(rawIngredient: RawIngredient): Promise<RawIngredient> {
    return this.rawIngredientRepository.save(rawIngredient);
  }

  async findBy(params: Partial<RawIngredient>): Promise<RawIngredient | null> {
    return this.rawIngredientRepository.findOne({
      where: params as FindOptionsWhere<RawIngredient>,
    });
  }

  async findAllBy(params: Partial<RawIngredient>): Promise<RawIngredient[]> {
    return this.rawIngredientRepository.find({
      where: params as FindOptionsWhere<RawIngredient>,
    });
  }
}
