import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';
import { RawIngredient } from '../raw-ingredient/raw-ingredient.entity';

export type CookedIngredientProps = NutritionalEntityProps & {
  id?: string;
  name: string;
};

export class CookedIngredient extends NutritionalEntity {
  private _id?: string;
  private _name: string;

  private constructor(props: CookedIngredientProps) {
    super(props);
    this._id = props.id;
    this._name = props.name;
  }

  public static create(props: CookedIngredientProps): CookedIngredient {
    const cookedIngredient = new CookedIngredient(props);

    return cookedIngredient;
  }

  public static createFromRawIngredient(
    rawIngredient: RawIngredient,
    initialWeightInGrams: number,
    finalWeightInGrams: number,
  ): CookedIngredient {
    const scalingFactor = initialWeightInGrams / finalWeightInGrams;

    const protein_ratio = rawIngredient.protein_ratio * scalingFactor;
    const fat_ratio = rawIngredient.fat_ratio * scalingFactor;
    const carbohydrate_ratio = rawIngredient.carbohydrate_ratio * scalingFactor;
    const fiber_ratio = rawIngredient.fiber_ratio * scalingFactor;
    const kcal_per_gram = rawIngredient.kcal_per_gram * scalingFactor;

    const cookedIngredient = new CookedIngredient({
      name: `${rawIngredient.name} cooked`,
      protein_ratio,
      fat_ratio,
      carbohydrate_ratio,
      fiber_ratio,
      kcal_per_gram,
    });

    return cookedIngredient;
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
