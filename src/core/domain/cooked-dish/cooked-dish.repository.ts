import { CookedDish } from './cooked-dish.entity';

export abstract class CookedDishRepository {
  abstract insert(rawIngredient: CookedDish): Promise<any>;
  abstract findAll(): Promise<CookedDish[]>;
  abstract findOne(id: string): Promise<CookedDish | null>;
  abstract update(rawIngredient: CookedDish): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
