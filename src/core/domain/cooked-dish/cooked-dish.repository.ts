import { CookedDish } from './cooked-dish.entity';

export abstract class CookedDishRepository {
  abstract create(rawIngredient: CookedDish): Promise<any>;
  abstract findBy(params: Partial<CookedDish>): Promise<CookedDish | null>;
  abstract findAllBy(params: Partial<CookedDish>): Promise<CookedDish[]>;
}
