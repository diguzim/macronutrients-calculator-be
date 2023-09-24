export type RawIngredientProps = {
  id?: string;
  name: string;
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export class RawIngredient {
  private _id?: string;
  private _name: string;
  private _protein_ratio: number;
  private _fat_ratio: number;
  private _carbohydrate_ratio: number;
  private _fiber_ratio: number;
  private _kcal_per_gram: number;

  private constructor(props: RawIngredientProps) {
    Object.assign(this, props);
  }

  public static create(props: RawIngredientProps): RawIngredient {
    const rawIngredient = new RawIngredient(props);
    return rawIngredient;
  }

  checkIfRatioSumIsOne(): boolean {
    const sum =
      this._protein_ratio +
      this._fat_ratio +
      this._carbohydrate_ratio +
      this._fiber_ratio;

    return Math.round(sum) === 1;
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
