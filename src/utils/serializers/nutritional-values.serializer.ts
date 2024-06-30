import { NutritionalSnapshot } from '../../core/domain/item/item.entity';

export type NutritionalValuesSerialized = {
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

export class NutritionalValuesSerializer {
  public static serialize(
    nutritionalValues: NutritionalSnapshot,
  ): NutritionalValuesSerialized {
    return {
      protein: nutritionalValues.protein,
      fat: nutritionalValues.fat,
      carbohydrate: nutritionalValues.carbohydrate,
      fiber: nutritionalValues.fiber,
      kcal: nutritionalValues.kcal,
    };
  }
}
