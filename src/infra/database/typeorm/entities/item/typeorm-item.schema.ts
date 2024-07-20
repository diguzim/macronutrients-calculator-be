import { EntitySchema } from 'typeorm';
import { Item, ItemType } from '../../../../../core/domain/item/item.entity';

export const ItemSchema = new EntitySchema<Item>({
  name: 'Item',
  tableName: 'items',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    type: {
      type: 'enum',
      enum: ItemType,
    },
    proteinRatio: {
      type: 'float',
    },
    fatRatio: {
      type: 'float',
    },
    carbohydrateRatio: {
      type: 'float',
    },
    fiberRatio: {
      type: 'float',
    },
    kcalPerGram: {
      type: 'float',
    },
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
