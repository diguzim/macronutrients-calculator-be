import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';

export type ItemProps = {
  id?: string;
  name: string;
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
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

export class Item {
  id?: string;
  name: string;
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: ItemProps) {
    Object.assign(this, props);
  }

  public static createFromAbsoluteValues(
    props: CreateFromAbsoluteValuesInput,
  ): Item {
    const rawIngredient = new Item({
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
