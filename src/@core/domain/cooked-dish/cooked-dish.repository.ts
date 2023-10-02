import { CookedDish } from './cooked-dish.entity';

export interface ICookedDishRepository {
  insert(rawIngredient: CookedDish): Promise<any>;
  findAll(): Promise<CookedDish[]>;
  findOne(id: string): Promise<CookedDish | null>;
  update(rawIngredient: CookedDish): Promise<void>;
  delete(id: string): Promise<void>;
}
