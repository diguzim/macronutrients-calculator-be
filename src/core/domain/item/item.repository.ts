import { Item } from './item.entity';

export abstract class ItemRepository {
  abstract create(item: Item): Promise<Item>;
  abstract findBy(params: Partial<Item>): Promise<Item | null>;
  abstract findAllBy(params: Partial<Item>): Promise<Item[]>;
}
