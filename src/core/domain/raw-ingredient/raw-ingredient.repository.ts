import { RawIngredient } from './raw-ingredient.entity';

export abstract class RawIngredientRepository {
  abstract create(rawIngredient: RawIngredient): Promise<RawIngredient>;
  abstract findBy(
    params: Partial<RawIngredient>,
  ): Promise<RawIngredient | null>;
}
