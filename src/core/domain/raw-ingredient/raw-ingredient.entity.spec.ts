import { RawIngredient } from './raw-ingredient.entity';

describe('RawIngredient', () => {
  describe('createFromRatio', () => {
    it('should create a RawIngredient using constructor', () => {
      const rawIngredient = new RawIngredient({
        name: 'Raw Ingredient',
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });

      expect(rawIngredient).toBeInstanceOf(RawIngredient);
      expect(rawIngredient.ratioSum()).toBe(1);
    });
  });

  describe('createFromAbsoluteValues', () => {
    it('should create a RawIngredient from absolute values', () => {
      const rawIngredient = RawIngredient.createFromAbsoluteValues({
        name: 'Raw Ingredient',
        weight: 100,
        protein: 30,
        fat: 30,
        carbohydrate: 30,
        fiber: 10,
        kcal: 400,
      });

      expect(rawIngredient).toBeInstanceOf(RawIngredient);
      expect(rawIngredient.ratioSum()).toBe(1);
    });
  });
});
