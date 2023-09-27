import { CookedIngredient } from '../../@core/domain/cooked-ingredient/cooked-ingredient.entity';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';

export const MockedRawIngredient = RawIngredient.create({
  id: '1',
  name: 'Some raw ingredient',
  protein_ratio: 0.2,
  fat_ratio: 0.3,
  carbohydrate_ratio: 0.4,
  fiber_ratio: 0.1,
  kcal_per_gram: 1,
});

export const MockedCookedIngredient = CookedIngredient.createFromRawIngredient(
  MockedRawIngredient,
  100,
  200,
);
