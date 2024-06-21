import { FindOptionsWhere, Repository } from 'typeorm';
import { CookedDishRepository } from '../../../../../core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../../core/domain/cooked-dish/cooked-dish.entity';

export class TypeormCookedDishRepository implements CookedDishRepository {
  constructor(private readonly cookedDishRepository: Repository<CookedDish>) {}

  async create(cookedDish: CookedDish): Promise<CookedDish> {
    return this.cookedDishRepository.save(cookedDish);
  }

  async findBy(params: Partial<CookedDish>): Promise<CookedDish | null> {
    return this.cookedDishRepository.findOne({
      where: params as FindOptionsWhere<CookedDish>,
    });
  }

  async findAllBy(params: Partial<CookedDish>): Promise<CookedDish[]> {
    return this.cookedDishRepository.find({
      where: params as FindOptionsWhere<CookedDish>,
    });
  }
}
