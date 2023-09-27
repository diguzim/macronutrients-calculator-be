import { RawIngredient } from './raw-ingredient.entity';

describe('RawIngredient', () => {
  describe('createFromRatio', () => {
    it('should create a RawIngredient when ratios are valid', () => {
      const rawIngredient = RawIngredient.createFromRatios({
        name: 'Raw Ingredient',
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });

      expect(rawIngredient).toBeInstanceOf(RawIngredient);
      expect(rawIngredient.isRatioSumOne()).toBe(true);
    });

    it('should throw an error when protein ratio is less than zero', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: -0.1,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.3,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Protein ratio cannot be less than 0');
    });

    it('should throw an error when fat ratio is less than zero', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: -0.1,
          carbohydrate_ratio: 0.3,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Fat ratio cannot be less than 0');
    });

    it('should throw an error when carbohydrate ratio is less than zero', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: 0.3,
          carbohydrate_ratio: -0.1,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Carbohydrate ratio cannot be less than 0');
    });

    it('should throw an error when fiber ratio is less than zero', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.3,
          fiber_ratio: -0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Fiber ratio cannot be less than 0');
    });

    it('should throw an error when protein ratio is greater than one', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 1.1,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.3,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Protein ratio cannot be greater than 1');
    });

    it('should throw an error when fat ratio is greater than one', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: 1.1,
          carbohydrate_ratio: 0.3,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Fat ratio cannot be greater than 1');
    });

    it('should throw an error when carbohydrate ratio is greater than one', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: 0.3,
          carbohydrate_ratio: 1.1,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Carbohydrate ratio cannot be greater than 1');
    });

    it('should throw an error when fiber ratio is greater than one', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.3,
          fiber_ratio: 1.1,
          kcal_per_gram: 4,
        }),
      ).toThrowError('Fiber ratio cannot be greater than 1');
    });

    it('should not throw an error when ratios do not sum up to one', () => {
      expect(() =>
        RawIngredient.createFromRatios({
          name: 'Raw Ingredient',
          protein_ratio: 0.3,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.3,
          fiber_ratio: 0.1,
          kcal_per_gram: 4,
        }),
      ).not.toThrowError('Ratios do not sum up to one');
    });
  });

  describe('createFromAbsoluteValues', () => {
    it('should create a RawIngredient when values are valid', () => {
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
      expect(rawIngredient.isRatioSumOne()).toBe(true);
    });

    it('should throw an error when protein is less than zero', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: -1,
          fat: 30,
          carbohydrate: 30,
          fiber: 10,
          kcal: 400,
        }),
      ).toThrowError('Protein ratio cannot be less than 0');
    });

    it('should throw an error when fat is less than zero', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 30,
          fat: -1,
          carbohydrate: 30,
          fiber: 10,
          kcal: 400,
        }),
      ).toThrowError('Fat ratio cannot be less than 0');
    });

    it('should throw an error when carbohydrate is less than zero', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 30,
          fat: 30,
          carbohydrate: -1,
          fiber: 10,
          kcal: 400,
        }),
      ).toThrowError('Carbohydrate ratio cannot be less than 0');
    });

    it('should throw an error when fiber is less than zero', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 30,
          fat: 30,
          carbohydrate: 30,
          fiber: -1,
          kcal: 400,
        }),
      ).toThrowError('Fiber ratio cannot be less than 0');
    });

    it('should throw an error when protein is greater than weight', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 101,
          fat: 30,
          carbohydrate: 30,
          fiber: 10,
          kcal: 400,
        }),
      ).toThrowError('Protein ratio cannot be greater than 1');
    });

    it('should throw an error when fat is greater than weight', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 30,
          fat: 101,
          carbohydrate: 30,
          fiber: 10,
          kcal: 400,
        }),
      ).toThrowError('Fat ratio cannot be greater than 1');
    });

    it('should throw an error when carbohydrate is greater than weight', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 30,
          fat: 30,
          carbohydrate: 101,
          fiber: 10,
          kcal: 400,
        }),
      ).toThrowError('Carbohydrate ratio cannot be greater than 1');
    });

    it('should throw an error when fiber is greater than weight', () => {
      expect(() =>
        RawIngredient.createFromAbsoluteValues({
          name: 'Raw Ingredient',
          weight: 100,
          protein: 30,
          fat: 30,
          carbohydrate: 30,
          fiber: 101,
          kcal: 400,
        }),
      ).toThrowError('Fiber ratio cannot be greater than 1');
    });
  });
});
