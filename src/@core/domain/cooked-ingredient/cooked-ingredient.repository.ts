import { CookedIngredient } from './cooked-ingredient.entity';

export abstract class CookedIngredientRepository {
  abstract insert(rawIngredient: CookedIngredient): Promise<any>;
  abstract findAll(): Promise<CookedIngredient[]>;
  abstract findOne(id: string): Promise<CookedIngredient | null>;
  abstract update(rawIngredient: CookedIngredient): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
