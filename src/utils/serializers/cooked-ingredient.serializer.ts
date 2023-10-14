import { CookedIngredient } from '../../@core/domain/cooked-ingredient/cooked-ingredient.entity';

export type CookedIngredientSerialized = {
  id: string;
  name: string;
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export class CookedIngredientSerializer {
  public static serialize(
    rawIngredient: CookedIngredient,
  ): CookedIngredientSerialized {
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
