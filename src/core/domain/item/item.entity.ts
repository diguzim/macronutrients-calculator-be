import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';

export enum ItemType {
  RAW = 'raw',
  RECIPE = 'recipe',
}

export type ItemProps = {
  id?: string;
  name: string;
  type: ItemType;
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
  type: ItemType;
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
  type: ItemType;
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
    const { name, type, protein, fat, carbohydrate, fiber, kcal, weight } =
      props;

    const rawIngredient = new Item({
      name: name,
      type: type,
      proteinRatio: approximatelyParseFloat(protein / weight),
      fatRatio: approximatelyParseFloat(fat / weight),
      carbohydrateRatio: approximatelyParseFloat(carbohydrate / weight),
      fiberRatio: approximatelyParseFloat(fiber / weight),
      kcalPerGram: approximatelyParseFloat(kcal / weight),
    });

    return rawIngredient;
  }
}
