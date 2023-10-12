import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientSerializer } from './raw-ingredient.serializer';

describe('RawIngredientSerializer', () => {
  describe('serialize', () => {
    it('should serialize a raw ingredient', () => {
      const rawIngredient = RawIngredient.createFromRatios({
        name: 'name',
        protein_ratio: 0.1,
        fat_ratio: 0.2,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.4,
        kcal_per_gram: 0.5,
      });
      rawIngredient.id = '1';

      const serializedRawIngredient =
        RawIngredientSerializer.serialize(rawIngredient);
      expect(serializedRawIngredient).toEqual({
        id: '1',
        name: 'name',
        protein_ratio: 0.1,
        fat_ratio: 0.2,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.4,
        kcal_per_gram: 0.5,
      });
    });
  });
});
