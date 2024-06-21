import { RawIngredient } from '../raw-ingredient/raw-ingredient.entity';
import { CookedDish } from './cooked-dish.entity';

describe('CookedDish', () => {
  describe('createFromRawIngredients', () => {
    it('should create a cooked dish from raw ingredients', () => {
      const rawIngredientsWithAmounts = [
        {
          rawIngredient: new RawIngredient({
            name: 'raw ingredient 1',
            proteinRatio: 0.1,
            fatRatio: 0.2,
            carbohydrateRatio: 0.3,
            fiberRatio: 0.4,
            kcalPerGram: 0.5,
          }),
          amountInGrams: 100,
        },
        {
          rawIngredient: new RawIngredient({
            name: 'raw ingredient 2',
            proteinRatio: 0.6,
            fatRatio: 0.7,
            carbohydrateRatio: 0.8,
            fiberRatio: 0.9,
            kcalPerGram: 1.0,
          }),
          amountInGrams: 200,
        },
      ];

      const cookedDish = CookedDish.createFromRawIngredientsAmounts(
        'some cooked dish',
        rawIngredientsWithAmounts,
        600,
      );

      expect(cookedDish.proteinRatio).toEqual(
        rawIngredientsWithAmounts.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.rawIngredient.proteinRatio *
              rawIngredient.amountInGrams,
          0,
        ) / 600,
      );

      expect(cookedDish.fatRatio).toEqual(
        rawIngredientsWithAmounts.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.rawIngredient.fatRatio * rawIngredient.amountInGrams,
          0,
        ) / 600,
      );

      expect(cookedDish.carbohydrateRatio).toEqual(
        rawIngredientsWithAmounts.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.rawIngredient.carbohydrateRatio *
              rawIngredient.amountInGrams,
          0,
        ) / 600,
      );

      expect(cookedDish.fiberRatio).toEqual(
        rawIngredientsWithAmounts.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.rawIngredient.fiberRatio *
              rawIngredient.amountInGrams,
          0,
        ) / 600,
      );

      expect(cookedDish.kcalPerGram).toEqual(
        rawIngredientsWithAmounts.reduce(
          (acc, rawIngredient) =>
            acc +
            rawIngredient.rawIngredient.kcalPerGram *
              rawIngredient.amountInGrams,
          0,
        ) / 600,
      );
    });
  });
});
