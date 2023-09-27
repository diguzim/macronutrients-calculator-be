import { RawIngredient } from './raw-ingredient.entity';

export interface IRawIngredientRepository {
  insert(rawIngredient: RawIngredient): Promise<any>;
  findAll(): Promise<RawIngredient[]>;
  findOne(id: string): Promise<RawIngredient | null>;
  findOneBy(params: Partial<RawIngredient>): Promise<RawIngredient | null>;
  update(rawIngredient: RawIngredient): Promise<void>;
  delete(id: string): Promise<void>;
}
