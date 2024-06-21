import { EntitySchema } from 'typeorm';
import { RawIngredient } from '../../../../../core/domain/raw-ingredient/raw-ingredient.entity';
import { NutritionalEntitySchemaPart } from '../nutritional-entity/typeorm-nutritional-entity.schema';

export const RawIngredientSchema = new EntitySchema<RawIngredient>({
  name: 'RawIngredient',
  tableName: 'raw_ingredients',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    ...NutritionalEntitySchemaPart,
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
});
