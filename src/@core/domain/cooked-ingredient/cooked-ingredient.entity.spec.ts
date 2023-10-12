import { mockedRawIngredient } from '../../../utils/test/mocked.entities';
import { CookedIngredient } from './cooked-ingredient.entity';

describe('CookedIngredient', () => {
  describe('createFromRawIngredient', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should create a CookedIngredient from a raw ingredient', () => {
      const rawIngredient = mockedRawIngredient;
      const initialWeightInGrams = 100;
      const finalWeightInGrams = 200;

      const cookedIngredient = CookedIngredient.createFromRawIngredient(
        rawIngredient,
        initialWeightInGrams,
        finalWeightInGrams,
      );

      expect(cookedIngredient).toBeInstanceOf(CookedIngredient);

      expect(cookedIngredient.name).toBe(`${rawIngredient.name} cooked`);

      const ratio = initialWeightInGrams / finalWeightInGrams;

      expect(cookedIngredient.protein_ratio).toBe(
        rawIngredient.protein_ratio * ratio,
      );

      expect(cookedIngredient.fat_ratio).toBe(rawIngredient.fat_ratio * ratio);

      expect(cookedIngredient.carbohydrate_ratio).toBe(
        rawIngredient.carbohydrate_ratio * ratio,
      );

      expect(cookedIngredient.fiber_ratio).toBe(
        rawIngredient.fiber_ratio * ratio,
      );

      expect(cookedIngredient.kcal_per_gram).toBe(
        rawIngredient.kcal_per_gram * ratio,
      );
    });
  });
});
