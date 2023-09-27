import { CookedIngredient } from './cooked-ingredient.entity';

export interface ICookedIngredientRepository {
  insert(rawIngredient: CookedIngredient): Promise<any>;
  findAll(): Promise<CookedIngredient[]>;
  findOne(id: string): Promise<CookedIngredient | null>;
  findOneBy(
    params: Partial<CookedIngredient>,
  ): Promise<CookedIngredient | null>;
  update(rawIngredient: CookedIngredient): Promise<void>;
  delete(id: string): Promise<void>;
}
