import { Item } from '../../core/domain/item/item.entity';

export class ItemSerializer {
  public static serialize(item: Item) {
    return {
      id: item.id,
      name: item.name,
      isPublic: item.isPublic,
      type: item.type,
      proteinRatio: item.proteinRatio,
      fatRatio: item.fatRatio,
      carbohydrateRatio: item.carbohydrateRatio,
      fiberRatio: item.fiberRatio,
      kcalPerGram: item.kcalPerGram,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
