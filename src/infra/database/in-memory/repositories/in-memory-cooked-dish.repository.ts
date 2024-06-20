import { Injectable } from '@nestjs/common';
import { CookedDishRepository } from '../../../../core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../core/domain/cooked-dish/cooked-dish.entity';

@Injectable()
export class InMemoryCookedDishRepository implements CookedDishRepository {
  private readonly cookedDishes: CookedDish[] = [];

  async insert(cookedDish: CookedDish): Promise<CookedDish> {
    cookedDish.id = (this.cookedDishes.length + 1).toString();
    this.cookedDishes.push(cookedDish);

    return cookedDish;
  }

  async findAll(): Promise<CookedDish[]> {
    return this.cookedDishes;
  }

  async findOne(id: string): Promise<CookedDish | null> {
    return this.cookedDishes.find((cookedDish) => cookedDish.id === id);
  }

  async update(cookedDish: CookedDish): Promise<void> {
    this.cookedDishes.forEach((cd, index) => {
      if (cd.id === cookedDish.id) {
        this.cookedDishes[index] = cookedDish;
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.cookedDishes.forEach((cd, index) => {
      if (cd.id === id) {
        this.cookedDishes.splice(index, 1);
      }
    });
  }
}
