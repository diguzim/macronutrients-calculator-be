import { NutritionalEntity } from '../../core/domain/nutritional-entity/nutritional-entity.entity';

export type NutritionalEntitySerialized = {
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
};

export class NutritionalEntitySerializer {
  public static serialize(
    rawIngredient: NutritionalEntity,
  ): NutritionalEntitySerialized {
    return {
      proteinRatio: rawIngredient.proteinRatio,
      fatRatio: rawIngredient.fatRatio,
      carbohydrateRatio: rawIngredient.carbohydrateRatio,
      fiberRatio: rawIngredient.fiberRatio,
      kcalPerGram: rawIngredient.kcalPerGram,
    };
  }
}
