import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';
import { User } from '../user/user.entity';

type ItemWithWeight = {
  item: Item;
  weight: number;
};

export enum ItemType {
  RAW = 'raw',
  RECIPE = 'recipe',
}

export type NutritionalSnapshot = {
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

type ItemProps = {
  id?: string;
  name: string;
  userId?: string | null;
  user?: User;
  isPublic?: boolean;
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
  userId?: string;
  type: ItemType;
  weight: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

export type CreateFromCompositionInput = {
  name: string;
  itemsWithWeights: ItemWithWeight[];
  finalWeight: number;
  userId?: string | null;
};

export class Item {
  id?: string;
  name: string;
  userId: string | null = null;
  user?: User;
  isPublic: boolean = false;
  type: ItemType;
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: ItemProps) {
    const { userId } = props;

    Object.assign(this, {
      ...props,
      userId: userId || null,
    });
  }

  public static createFromAbsoluteValues(
    props: CreateFromAbsoluteValuesInput,
  ): Item {
    const {
      name,
      type,
      protein,
      fat,
      carbohydrate,
      fiber,
      kcal,
      weight,
      userId = null,
    } = props;

    const item = new Item({
      name,
      userId,
      type,
      proteinRatio: approximatelyParseFloat(protein / weight),
      fatRatio: approximatelyParseFloat(fat / weight),
      carbohydrateRatio: approximatelyParseFloat(carbohydrate / weight),
      fiberRatio: approximatelyParseFloat(fiber / weight),
      kcalPerGram: approximatelyParseFloat(kcal / weight),
    });

    return item;
  }

  public static createFromComposition(props: CreateFromCompositionInput): Item {
    const { name, itemsWithWeights, finalWeight, userId = null } = props;

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
      userId,
      type: ItemType.RECIPE,
      proteinRatio,
      fatRatio,
      carbohydrateRatio,
      fiberRatio,
      kcalPerGram,
    });
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
}
