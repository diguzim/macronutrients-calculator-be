import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';
import ItemsSeeder from './seeds/items.seeder';

(async () => {
  dataSource;
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [ItemsSeeder],
  });

  await dataSource.destroy();
})();
