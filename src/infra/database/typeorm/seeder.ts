import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';
import RawIngredientSeeder from './seeds/raw-ingredient.seeder';

(async () => {
  dataSource;
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [RawIngredientSeeder],
  });
})();
