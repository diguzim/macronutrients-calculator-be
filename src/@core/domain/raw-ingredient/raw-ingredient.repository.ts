import { RawIngredient } from './raw-ingredient.entity';

export abstract class RawIngredientRepository {
  abstract insert(rawIngredient: RawIngredient): Promise<RawIngredient>;
  abstract findAll(): Promise<RawIngredient[]>;
  abstract findOne(id: string): Promise<RawIngredient | null>;
  abstract update(rawIngredient: RawIngredient): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
