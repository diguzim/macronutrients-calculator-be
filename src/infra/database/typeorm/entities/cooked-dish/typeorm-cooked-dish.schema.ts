import { EntitySchema } from 'typeorm';
import { NutritionalEntitySchemaPart } from '../nutritional-entity/typeorm-nutritional-entity.schema';
import { CookedDish } from '../../../../../core/domain/cooked-dish/cooked-dish.entity';

export const CookedDishSchema = new EntitySchema<CookedDish>({
  name: 'CookedDish',
  tableName: 'cooked_dishes',
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
