import { CookedIngredient } from '../../@core/domain/cooked-ingredient/cooked-ingredient.entity';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { CookedIngredientSerializer } from './cooked-ingredient.serializer';

describe('CookedIngredientSerializer', () => {
  describe('serialize', () => {
    it('should serialize a cooked ingredient', () => {
      const rawIngredient = RawIngredient.createFromRatios({
        name: 'name',
        protein_ratio: 0.1,
        fat_ratio: 0.2,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.4,
        kcal_per_gram: 0.5,
      });
      const cookedIngredient = CookedIngredient.createFromRawIngredient(
        rawIngredient,
        100,
        200,
      );
      cookedIngredient.id = '1';

      const serializedCookedIngredient =
        CookedIngredientSerializer.serialize(cookedIngredient);
      expect(serializedCookedIngredient).toEqual({
        id: '1',
        name: 'name cooked',
        protein_ratio: 0.05,
        fat_ratio: 0.1,
        carbohydrate_ratio: 0.15,
        fiber_ratio: 0.2,
        kcal_per_gram: 0.25,
      });
    });
  });
});
