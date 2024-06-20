import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';

export type NutritionalEntityProps = {
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
};

export type NutritionalSnapshot = {
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

export abstract class NutritionalEntity {
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;

  constructor(props: NutritionalEntityProps) {
    Object.assign(this, props);
  }

  calculateNutritionalSnapshot(weight: number): NutritionalSnapshot {
    const protein = this.proteinRatio * weight;
    const fat = this.fatRatio * weight;
    const carbohydrate = this.carbohydrateRatio * weight;
    const fiber = this.fiberRatio * weight;
    const kcal = this.kcalPerGram * weight;

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
      this.proteinRatio +
      this.fatRatio +
      this.carbohydrateRatio +
      this.fiberRatio;

    return approximatelyParseFloat(sum);
  }
}
