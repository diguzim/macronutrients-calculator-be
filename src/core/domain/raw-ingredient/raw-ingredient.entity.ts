import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';

export type RawIngredientProps = NutritionalEntityProps & {
  id?: string;
  name: string;
};

export type CreateRawIngredientFromRatiosInput = NutritionalEntityProps & {
  name: string;
};

export type CreateFromAbsoluteValuesInput = {
  name: string;
  weight: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

export class RawIngredient extends NutritionalEntity {
  private _id?: string;
  private _name: string;

  constructor(props: RawIngredientProps) {
    super(props);
    this._id = props.id;
    this._name = props.name;
  }

  public static createFromRatios(
    props: CreateRawIngredientFromRatiosInput,
  ): RawIngredient {
    const rawIngredient = new RawIngredient(props);
    return rawIngredient;
  }

  public static createFromAbsoluteValues(
    props: CreateFromAbsoluteValuesInput,
  ): RawIngredient {
    const rawIngredient = new RawIngredient({
      name: props.name,
      protein_ratio: props.protein / props.weight,
      fat_ratio: props.fat / props.weight,
      carbohydrate_ratio: props.carbohydrate / props.weight,
      fiber_ratio: props.fiber / props.weight,
      kcal_per_gram: props.kcal / props.weight,
    });

    return rawIngredient;
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
