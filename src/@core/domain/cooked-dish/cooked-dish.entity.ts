import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';
import { RawIngredient } from '../raw-ingredient/raw-ingredient.entity';

export type RawIngredientWithAmount = {
  raw_ingredient: RawIngredient;
  amount_in_grams: number;
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
        rawIngredientWithAmount.raw_ingredient.protein_ratio *
        rawIngredientWithAmount.amount_in_grams;
      totalFat +=
        rawIngredientWithAmount.raw_ingredient.fat_ratio *
        rawIngredientWithAmount.amount_in_grams;
      totalCarbohydrate +=
        rawIngredientWithAmount.raw_ingredient.carbohydrate_ratio *
        rawIngredientWithAmount.amount_in_grams;
      totalFiber +=
        rawIngredientWithAmount.raw_ingredient.fiber_ratio *
        rawIngredientWithAmount.amount_in_grams;
      totalKcal +=
        rawIngredientWithAmount.raw_ingredient.kcal_per_gram *
        rawIngredientWithAmount.amount_in_grams;
    });

    const protein_ratio = totalProtein / finalWeightInGrams;
    const fat_ratio = totalFat / finalWeightInGrams;
    const carbohydrate_ratio = totalCarbohydrate / finalWeightInGrams;
    const fiber_ratio = totalFiber / finalWeightInGrams;
    const kcal_per_gram = totalKcal / finalWeightInGrams;

    const cookedDish = new CookedDish({
      name,
      protein_ratio,
      fat_ratio,
      carbohydrate_ratio,
      fiber_ratio,
      kcal_per_gram,
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
