import { RawIngredient } from '../../core/domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientSerializer } from './raw-ingredient.serializer';

describe('RawIngredientSerializer', () => {
  describe('serialize', () => {
    it('should serialize a raw ingredient', () => {
      const rawIngredient = new RawIngredient({
        name: 'name',
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 0.5,
      });
      rawIngredient.id = '1';

      const serializedRawIngredient =
        RawIngredientSerializer.serialize(rawIngredient);
      expect(serializedRawIngredient).toEqual({
        id: '1',
        name: 'name',
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 0.5,
      });
    });
  });
});
