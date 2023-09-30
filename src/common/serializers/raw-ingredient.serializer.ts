import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';

export type RawIngredientSerialized = {
  id: string;
  name: string;
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export class RawIngredientSerializer {
  public static serialize(
    rawIngredient: RawIngredient,
  ): RawIngredientSerialized {
    return {
      id: rawIngredient.id,
      name: rawIngredient.name,
      protein_ratio: rawIngredient.protein_ratio,
      fat_ratio: rawIngredient.fat_ratio,
      carbohydrate_ratio: rawIngredient.carbohydrate_ratio,
      fiber_ratio: rawIngredient.fiber_ratio,
      kcal_per_gram: rawIngredient.kcal_per_gram,
    };
  }
}
