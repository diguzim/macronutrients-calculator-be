import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';

export type NutritionalEntityProps = {
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export type NutritionalSnapshot = {
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

export abstract class NutritionalEntity {
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;

  constructor(props: NutritionalEntityProps) {
    Object.assign(this, props);
  }

  calculateNutritionalSnapshot(weight: number): NutritionalSnapshot {
    const protein = this.protein_ratio * weight;
    const fat = this.fat_ratio * weight;
    const carbohydrate = this.carbohydrate_ratio * weight;
    const fiber = this.fiber_ratio * weight;
    const kcal = this.kcal_per_gram * weight;

    return {
      protein,
      fat,
      carbohydrate,
      fiber,
      kcal,
    };
  }

  ratioSum(): number {
    const sum =
      this.protein_ratio +
      this.fat_ratio +
      this.carbohydrate_ratio +
      this.fiber_ratio;

    return approximatelyParseFloat(sum);
  }
}
