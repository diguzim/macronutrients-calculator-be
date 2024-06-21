import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RawIngredient } from '../../../../core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientSchema } from '../entities/raw-ingredient/typeorm-raw-ingredient.schema';

export default class RawIngredientSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(RawIngredientSchema);

    let riceIngredient = await repository.findOne({
      where: { name: 'Rice' },
    });

    if (!riceIngredient) {
      riceIngredient = RawIngredient.createFromAbsoluteValues({
        name: 'Rice',
        weight: 50,
        protein: 3.6,
        fat: 1,
        carbohydrate: 39,
        fiber: 2.4,
        kcal: 180,
      });
      riceIngredient.id = 'c64bbd58-2800-44d8-8bc6-db760801d88c';
      await repository.save([riceIngredient]);
    }

    let lentilIngredient = await repository.findOne({
      where: { name: 'Lentil' },
    });

    if (!lentilIngredient) {
      lentilIngredient = RawIngredient.createFromAbsoluteValues({
        name: 'Lentil',
        weight: 50,
        protein: 9,
        fat: 0.4,
        carbohydrate: 20,
        fiber: 8,
        kcal: 116,
      });
      lentilIngredient.id = '41486454-f6b2-4cde-8ef6-ce5323244f99';
      await repository.save([lentilIngredient]);
    }
  }
}
