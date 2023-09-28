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
  private _protein_ratio: number;
  private _fat_ratio: number;
  private _carbohydrate_ratio: number;
  private _fiber_ratio: number;
  private _kcal_per_gram: number;

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

  get ratioSum(): number {
    const sum =
      this._protein_ratio +
      this._fat_ratio +
      this._carbohydrate_ratio +
      this._fiber_ratio;

    return sum;
  }

  isRatioSumOne(): boolean {
    const result = this.approximatelyEqual(this.ratioSum, 1.0);
    return result;
  }

  isRatioSumMoreThanOne(): boolean {
    return this.aproximatelyGreaterThan(this.ratioSum, 1.0);
  }

  isRatioSumLessThanOne(): boolean {
    return this.approximatelyLessThan(this.ratioSum, 1.0);
  }

  private approximatelyEqual(a: number, b: number, tolerance: number = 0.0001) {
    return Math.abs(a - b) < tolerance;
  }

  private aproximatelyGreaterThan(
    a: number,
    b: number,
    tolerance: number = 0.0001,
  ) {
    return a - b > tolerance;
  }

  private approximatelyLessThan(
    a: number,
    b: number,
    tolerance: number = 0.0001,
  ) {
    return b - a > tolerance;
  }

  get protein_ratio(): number {
    return this._protein_ratio;
  }

  set protein_ratio(value: number) {
    if (value < 0) {
      throw new Error('Protein ratio cannot be less than 0');
    } else if (value > 1) {
      throw new Error('Protein ratio cannot be greater than 1');
    }

    this._protein_ratio = value;
  }

  get fat_ratio(): number {
    return this._fat_ratio;
  }

  set fat_ratio(value: number) {
    if (value < 0) {
      throw new Error('Fat ratio cannot be less than 0');
    } else if (value > 1) {
      throw new Error('Fat ratio cannot be greater than 1');
    }

    this._fat_ratio = value;
  }

  get carbohydrate_ratio(): number {
    return this._carbohydrate_ratio;
  }

  set carbohydrate_ratio(value: number) {
    if (value < 0) {
      throw new Error('Carbohydrate ratio cannot be less than 0');
    } else if (value > 1) {
      throw new Error('Carbohydrate ratio cannot be greater than 1');
    }

    this._carbohydrate_ratio = value;
  }

  get fiber_ratio(): number {
    return this._fiber_ratio;
  }

  set fiber_ratio(value: number) {
    if (value < 0) {
      throw new Error('Fiber ratio cannot be less than 0');
    } else if (value > 1) {
      throw new Error('Fiber ratio cannot be greater than 1');
    }

    this._fiber_ratio = value;
  }

  get kcal_per_gram(): number {
    return this._kcal_per_gram;
  }

  set kcal_per_gram(value: number) {
    if (value < 0) {
      throw new Error('Kcal per gram cannot be less than 0');
    }

    this._kcal_per_gram = value;
  }
}
