import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { ItemSchema } from '../entities/item/typeorm-item.schema';
import { Item, ItemType } from '../../../../core/domain/item/item.entity';

export default class ItemsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ItemSchema);

    let riceItem = await repository.findOne({
      where: { name: 'Rice' },
    });

    if (!riceItem) {
      riceItem = Item.createFromAbsoluteValues({
        name: 'Rice',
        type: ItemType.RAW,
        weight: 50,
        protein: 3.6,
        fat: 1,
        carbohydrate: 39,
        fiber: 2.4,
        kcal: 180,
      });
      riceItem.id = 'c64bbd58-2800-44d8-8bc6-db760801d88c';
      await repository.save([riceItem]);
    }

    let lentilItem = await repository.findOne({
      where: { name: 'Lentil' },
    });

    if (!lentilItem) {
      lentilItem = Item.createFromAbsoluteValues({
        name: 'Lentil',
        type: ItemType.RAW,
        weight: 50,
        protein: 9,
        fat: 0.4,
        carbohydrate: 20,
        fiber: 8,
        kcal: 116,
      });
      lentilItem.id = '41486454-f6b2-4cde-8ef6-ce5323244f99';
      await repository.save([lentilItem]);
    }

    let riceWithLentilItem = await repository.findOne({
      where: { name: 'Rice with lentil' },
    });

    if (!riceWithLentilItem) {
      riceWithLentilItem = new Item({
        name: 'Rice with lentil',
        type: ItemType.RECIPE,
        proteinRatio: 0.045,
        fatRatio: 0.004625,
        carbohydrateRatio: 0.196875,
        fiberRatio: 0.0375,
        kcalPerGram: 0.9975,
      });
      riceWithLentilItem.id = '7771946d-7d2c-4ed6-b7b2-90a660b58d8b';
      await repository.save([riceWithLentilItem]);
    }
  }
}
