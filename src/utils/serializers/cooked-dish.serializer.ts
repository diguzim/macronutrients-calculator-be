import { CookedDish } from '../../core/domain/cooked-dish/cooked-dish.entity';
import {
  NutritionalEntitySerialized,
  NutritionalEntitySerializer,
} from './nutritional-entity.serializer';

export type CookedDishSerialized = NutritionalEntitySerialized & {
  id: string;
  name: string;
};

export class CookedDishSerializer extends NutritionalEntitySerializer {
  public static serialize(cookedDish: CookedDish): CookedDishSerialized {
    const cookedDishSerialized = super.serialize(cookedDish);
    const { id, name } = cookedDish;

    return {
      id,
      name,
      ...cookedDishSerialized,
    };
  }
}
