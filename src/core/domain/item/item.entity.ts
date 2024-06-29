import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';

type ItemWithWeight = {
  item: Item;
  weight: number;
};

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

    const item = new Item({
      name: name,
      type: type,
      proteinRatio: approximatelyParseFloat(protein / weight),
      fatRatio: approximatelyParseFloat(fat / weight),
      carbohydrateRatio: approximatelyParseFloat(carbohydrate / weight),
      fiberRatio: approximatelyParseFloat(fiber / weight),
      kcalPerGram: approximatelyParseFloat(kcal / weight),
    });

    return item;
  }

  public static createFromComposition(
    name: string,
    itemsWithWeights: ItemWithWeight[],
    finalWeight: number,
  ): Item {
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbohydrate = 0;
    let totalFiber = 0;
    let totalKcal = 0;

    itemsWithWeights.forEach((itemWithWeight) => {
      totalProtein += itemWithWeight.item.proteinRatio * itemWithWeight.weight;
      totalFat += itemWithWeight.item.fatRatio * itemWithWeight.weight;
      totalCarbohydrate +=
        itemWithWeight.item.carbohydrateRatio * itemWithWeight.weight;
      totalFiber += itemWithWeight.item.fiberRatio * itemWithWeight.weight;
      totalKcal += itemWithWeight.item.kcalPerGram * itemWithWeight.weight;
    });

    const proteinRatio = approximatelyParseFloat(totalProtein / finalWeight);
    const fatRatio = approximatelyParseFloat(totalFat / finalWeight);
    const carbohydrateRatio = approximatelyParseFloat(
      totalCarbohydrate / finalWeight,
    );
    const fiberRatio = approximatelyParseFloat(totalFiber / finalWeight);
    const kcalPerGram = approximatelyParseFloat(totalKcal / finalWeight);

    return new Item({
      name,
      type: ItemType.RECIPE,
      proteinRatio,
      fatRatio,
      carbohydrateRatio,
      fiberRatio,
      kcalPerGram,
    });
  }
}
