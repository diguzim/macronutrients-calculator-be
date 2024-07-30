import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Item, ItemType } from '../../../../core/domain/item/item.entity';
import { ItemSchema } from '../entities/item/typeorm-item.schema';

export default class ItemsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const items = await import('./items.json');
    console.log('items:', items);

    const repository = dataSource.getRepository(ItemSchema);

    const itemsToSeed = items.map((item) => {
      const newItem = Item.createFromAbsoluteValues({
        ...item,
        type: item.type as ItemType,
      });
      newItem.isPublic = true;
      return newItem;
    });

    await repository.save(itemsToSeed);
  }
}
