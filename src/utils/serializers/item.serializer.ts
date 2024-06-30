import { Item } from '../../core/domain/item/item.entity';

export class ItemSerializer {
  public static serialize(item: Item) {
    return item;
  }
}
