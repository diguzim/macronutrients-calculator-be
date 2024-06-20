import { RawIngredient } from '../../core/domain/raw-ingredient/raw-ingredient.entity';
import {
  NutritionalEntitySerialized,
  NutritionalEntitySerializer,
} from './nutritional-entity.serializer';

export type RawIngredientSerialized = NutritionalEntitySerialized & {
  id: string;
  name: string;
};

export class RawIngredientSerializer extends NutritionalEntitySerializer {
  public static serialize(
    rawIngredient: RawIngredient,
  ): RawIngredientSerialized {
    const nutritionalEntity = super.serialize(rawIngredient);
    const { id, name } = rawIngredient;

    return {
      id,
      name,
      ...nutritionalEntity,
    };
  }
}
