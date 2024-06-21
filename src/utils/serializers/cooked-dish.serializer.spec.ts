import { CookedDish } from '../../core/domain/cooked-dish/cooked-dish.entity';
import { RawIngredient } from '../../core/domain/raw-ingredient/raw-ingredient.entity';
import { CookedDishSerializer } from './cooked-dish.serializer';

describe('CookedDishSerializer', () => {
  describe('serialize', () => {
    it('should serialize a cooked dish', () => {
      const rawIngredient = new RawIngredient({
        name: 'some raw ingredient',
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 0.5,
      });
      const cookedDish = CookedDish.createFromRawIngredientsAmounts(
        'some cooked dish',
        [
          {
            rawIngredient: rawIngredient,
            amountInGrams: 100,
          },
        ],
        200,
      );
      cookedDish.id = '1';

      const serializedCookedDish = CookedDishSerializer.serialize(cookedDish);
      expect(serializedCookedDish).toEqual({
        id: '1',
        name: 'some cooked dish',
        proteinRatio: 0.05,
        fatRatio: 0.1,
        carbohydrateRatio: 0.15,
        fiberRatio: 0.2,
        kcalPerGram: 0.25,
      });
    });
  });
});
