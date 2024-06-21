import { FindOptionsWhere, Repository } from 'typeorm';
import { CookedDishRepository } from '../../../../../core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../../core/domain/cooked-dish/cooked-dish.entity';

export class TypeormCookedDishRepository implements CookedDishRepository {
  constructor(private readonly cookedDishRepository: Repository<CookedDish>) {}

  async create(cookedDish: CookedDish): Promise<CookedDish> {
    return this.cookedDishRepository.save(cookedDish);
  }

  async findBy(params: Partial<CookedDish>): Promise<CookedDish | null> {
    const result = await this.cookedDishRepository.findOne({
      where: params as FindOptionsWhere<CookedDish>,
    });

    return result ? this.toEntity(result) : null;
  }

  async findAllBy(params: Partial<CookedDish>): Promise<CookedDish[]> {
    const result = await this.cookedDishRepository.find({
      where: params as FindOptionsWhere<CookedDish>,
    });

    return result.map(this.toEntity);
  }

  private toEntity(cookedDish: CookedDish): CookedDish {
    return new CookedDish(cookedDish);
  }
}
