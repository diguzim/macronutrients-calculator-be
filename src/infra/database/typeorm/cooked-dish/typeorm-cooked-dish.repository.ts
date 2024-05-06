import { Repository } from 'typeorm';

import { CookedDish } from '../../../../@core/domain/cooked-dish/cooked-dish.entity';
import { CookedDishRepository } from '../../../../@core/domain/cooked-dish/cooked-dish.repository';

export class TypeormCookedDishRepository implements CookedDishRepository {
  constructor(private readonly cookedDishRepository: Repository<CookedDish>) {}

  async insert(cookedDish: CookedDish): Promise<CookedDish> {
    return this.cookedDishRepository.save(cookedDish);
  }

  async findAll(): Promise<CookedDish[]> {
    return this.cookedDishRepository.find();
  }

  async findOne(id: string): Promise<CookedDish | null> {
    return this.cookedDishRepository.findOneBy({ id });
  }

  async update(cookedDish: CookedDish): Promise<void> {
    await this.cookedDishRepository.save(cookedDish);
  }

  async delete(id: string): Promise<void> {
    await this.cookedDishRepository.delete(id);
  }
}
