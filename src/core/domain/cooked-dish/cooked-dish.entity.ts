import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';
import { RawIngredient } from '../raw-ingredient/raw-ingredient.entity';

export type RawIngredientWithAmount = {
  rawIngredient: RawIngredient;
  amountInGrams: number;
};

export type CookedDishProps = NutritionalEntityProps & {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class CookedDish extends NutritionalEntity {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: CookedDishProps) {
    super(props);
    Object.assign(this, props);
  }

  public static createFromRawIngredientsAmounts(
    name: string,
    rawIngredientsWithAmounts: RawIngredientWithAmount[],
    finalWeightInGrams: number,
  ): CookedDish {
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbohydrate = 0;
    let totalFiber = 0;
    let totalKcal = 0;

    rawIngredientsWithAmounts.forEach((rawIngredientWithAmount) => {
      totalProtein +=
        rawIngredientWithAmount.rawIngredient.proteinRatio *
        rawIngredientWithAmount.amountInGrams;
      totalFat +=
        rawIngredientWithAmount.rawIngredient.fatRatio *
        rawIngredientWithAmount.amountInGrams;
      totalCarbohydrate +=
        rawIngredientWithAmount.rawIngredient.carbohydrateRatio *
        rawIngredientWithAmount.amountInGrams;
      totalFiber +=
        rawIngredientWithAmount.rawIngredient.fiberRatio *
        rawIngredientWithAmount.amountInGrams;
      totalKcal +=
        rawIngredientWithAmount.rawIngredient.kcalPerGram *
        rawIngredientWithAmount.amountInGrams;
    });

    const proteinRatio = totalProtein / finalWeightInGrams;
    const fatRatio = totalFat / finalWeightInGrams;
    const carbohydrateRatio = totalCarbohydrate / finalWeightInGrams;
    const fiberRatio = totalFiber / finalWeightInGrams;
    const kcalPerGram = totalKcal / finalWeightInGrams;

    const cookedDish = new CookedDish({
      name,
      proteinRatio,
      fatRatio,
      carbohydrateRatio,
      fiberRatio,
      kcalPerGram,
    });

    return cookedDish;
  }
}
