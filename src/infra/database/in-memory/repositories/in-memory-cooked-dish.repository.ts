import { Injectable } from '@nestjs/common';
import { CookedDishRepository } from '../../../../core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../core/domain/cooked-dish/cooked-dish.entity';

@Injectable()
export class InMemoryCookedDishRepository implements CookedDishRepository {
  private readonly cookedDishes: CookedDish[] = [];

  async create(cookedDish: CookedDish): Promise<CookedDish> {
    cookedDish.id = (this.cookedDishes.length + 1).toString();
    this.cookedDishes.push(cookedDish);

    return cookedDish;
  }

  async findBy(params: Partial<CookedDish>): Promise<CookedDish | null> {
    return this.cookedDishes.find((cookedDish) =>
      Object.entries(params).every(([key, value]) => cookedDish[key] === value),
    );
  }

  async findAllBy(params: Partial<CookedDish>): Promise<CookedDish[]> {
    return this.cookedDishes.filter((cookedDish) =>
      Object.entries(params).every(([key, value]) => cookedDish[key] === value),
    );
  }
}
