import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';
import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';

export type RawIngredientProps = NutritionalEntityProps & {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: RawIngredientProps) {
    super(props);
    Object.assign(this, props);
  }

  public static createFromAbsoluteValues(
    props: CreateFromAbsoluteValuesInput,
  ): RawIngredient {
    const rawIngredient = new RawIngredient({
      name: props.name,
      proteinRatio: approximatelyParseFloat(props.protein / props.weight),
      fatRatio: approximatelyParseFloat(props.fat / props.weight),
      carbohydrateRatio: approximatelyParseFloat(
        props.carbohydrate / props.weight,
      ),
      fiberRatio: approximatelyParseFloat(props.fiber / props.weight),
      kcalPerGram: approximatelyParseFloat(props.kcal / props.weight),
    });

    return rawIngredient;
  }
}
