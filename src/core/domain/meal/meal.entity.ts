import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';
import { Item } from '../item/item.entity';
import { User } from '../user/user.entity';

type ItemWithWeight = {
  item: Item;
  weight: number;
};

type MealProps = {
  id?: string;
  userId?: string;
  user?: User;
  name: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Meal {
  id?: string;
  userId: string;
  user?: User;
  name: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: MealProps) {
    Object.assign(this, props);
  }

  public static createFromItems(
    name: string,
    itemsWithWeights: ItemWithWeight[],
    userId: string,
  ): Meal {
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

    return new Meal({
      userId: userId,
      name,
      protein: approximatelyParseFloat(totalProtein),
      fat: approximatelyParseFloat(totalFat),
      carbohydrate: approximatelyParseFloat(totalCarbohydrate),
      fiber: approximatelyParseFloat(totalFiber),
      kcal: approximatelyParseFloat(totalKcal),
    });
  }
}
