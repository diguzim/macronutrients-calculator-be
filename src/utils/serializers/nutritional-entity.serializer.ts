import { NutritionalEntity } from '../../@core/domain/nutritional-entity/nutritional-entity.entity';

export type NutritionalEntitySerialized = {
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export class NutritionalEntitySerializer {
  public static serialize(
    rawIngredient: NutritionalEntity,
  ): NutritionalEntitySerialized {
    return {
      protein_ratio: rawIngredient.protein_ratio,
      fat_ratio: rawIngredient.fat_ratio,
      carbohydrate_ratio: rawIngredient.carbohydrate_ratio,
      fiber_ratio: rawIngredient.fiber_ratio,
      kcal_per_gram: rawIngredient.kcal_per_gram,
    };
  }
}
