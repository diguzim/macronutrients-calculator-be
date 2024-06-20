import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';
import { RawIngredient } from '../raw-ingredient/raw-ingredient.entity';

export type RawIngredientWithAmount = {
  raw_ingredient: RawIngredient;
  amount_inGrams: number;
};

export type CookedDishProps = NutritionalEntityProps & {
  id?: string;
  name: string;
};

export class CookedDish extends NutritionalEntity {
  private _id?: string;
  private _name: string;

  constructor(props: CookedDishProps) {
    super(props);
    this._id = props.id;
    this._name = props.name;
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
        rawIngredientWithAmount.raw_ingredient.proteinRatio *
        rawIngredientWithAmount.amount_inGrams;
      totalFat +=
        rawIngredientWithAmount.raw_ingredient.fatRatio *
        rawIngredientWithAmount.amount_inGrams;
      totalCarbohydrate +=
        rawIngredientWithAmount.raw_ingredient.carbohydrateRatio *
        rawIngredientWithAmount.amount_inGrams;
      totalFiber +=
        rawIngredientWithAmount.raw_ingredient.fiberRatio *
        rawIngredientWithAmount.amount_inGrams;
      totalKcal +=
        rawIngredientWithAmount.raw_ingredient.kcalPerGram *
        rawIngredientWithAmount.amount_inGrams;
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

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
