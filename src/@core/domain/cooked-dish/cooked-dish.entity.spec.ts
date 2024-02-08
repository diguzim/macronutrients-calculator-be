import { RawIngredient } from '../raw-ingredient/raw-ingredient.entity';
import { CookedDish } from './cooked-dish.entity';

describe('CookedDish', () => {
  describe('createFromRawIngredients', () => {
    it('should create a cooked dish from raw ingredients', () => {
      const rawIngredients = [
        {
          raw_ingredient: RawIngredient.createFromRatios({
            name: 'raw ingredient 1',
            protein_ratio: 0.1,
            fat_ratio: 0.2,
            carbohydrate_ratio: 0.3,
            fiber_ratio: 0.4,
            kcal_per_gram: 0.5,
          }),
          amount_in_grams: 100,
        },
        {
          raw_ingredient: RawIngredient.createFromRatios({
            name: 'raw ingredient 2',
            protein_ratio: 0.6,
            fat_ratio: 0.7,
            carbohydrate_ratio: 0.8,
            fiber_ratio: 0.9,
            kcal_per_gram: 1.0,
          }),
          amount_in_grams: 200,
        },
      ];

      const cookedDish = CookedDish.createFromRawIngredientsAmounts(
        'cooked dish',
        rawIngredients,
        600,
      );

      expect(cookedDish.protein_ratio).toEqual(
        rawIngredients.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.raw_ingredient.protein_ratio *
              rawIngredient.amount_in_grams,
          0,
        ) / 600,
      );

      expect(cookedDish.fat_ratio).toEqual(
        rawIngredients.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.raw_ingredient.fat_ratio *
              rawIngredient.amount_in_grams,
          0,
        ) / 600,
      );

      expect(cookedDish.carbohydrate_ratio).toEqual(
        rawIngredients.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.raw_ingredient.carbohydrate_ratio *
              rawIngredient.amount_in_grams,
          0,
        ) / 600,
      );

      expect(cookedDish.fiber_ratio).toEqual(
        rawIngredients.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.raw_ingredient.fiber_ratio *
              rawIngredient.amount_in_grams,
          0,
        ) / 600,
      );

      expect(cookedDish.kcal_per_gram).toEqual(
        rawIngredients.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.raw_ingredient.kcal_per_gram *
              rawIngredient.amount_in_grams,
          0,
        ) / 600,
      );
    });
  });
});
