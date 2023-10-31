import { CookedIngredient } from '../../@core/domain/cooked-ingredient/cooked-ingredient.entity';
import {
  NutritionalEntitySerialized,
  NutritionalEntitySerializer,
} from './nutritional-entity.serializer';

export type CookedIngredientSerialized = NutritionalEntitySerialized & {
  id: string;
  name: string;
};

export class CookedIngredientSerializer extends NutritionalEntitySerializer {
  public static serialize(
    rawIngredient: CookedIngredient,
  ): CookedIngredientSerialized {
    const nutritionalEntitySerialized = super.serialize(rawIngredient);
    const { id, name } = rawIngredient;

    return {
      id,
      name,
      ...nutritionalEntitySerialized,
    };
  }
}
