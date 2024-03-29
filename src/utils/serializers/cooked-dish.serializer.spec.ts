import { CookedDish } from '../../@core/domain/cooked-dish/cooked-dish.entity';
import { RawIngredient } from '../../@core/domain/raw-ingredient/raw-ingredient.entity';
import { CookedDishSerializer } from './cooked-dish.serializer';

describe('CookedDishSerializer', () => {
  describe('serialize', () => {
    it('should serialize a cooked dish', () => {
      const rawIngredient = RawIngredient.createFromRatios({
        name: 'some raw ingredient',
        protein_ratio: 0.1,
        fat_ratio: 0.2,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.4,
        kcal_per_gram: 0.5,
      });
      const cookedDish = CookedDish.createFromRawIngredientsAmounts(
        'some cooked dish',
        [
          {
            raw_ingredient: rawIngredient,
            amount_in_grams: 100,
          },
        ],
        200,
      );
      cookedDish.id = '1';

      const serializedCookedDish = CookedDishSerializer.serialize(cookedDish);
      expect(serializedCookedDish).toEqual({
        id: '1',
        name: 'some cooked dish',
        protein_ratio: 0.05,
        fat_ratio: 0.1,
        carbohydrate_ratio: 0.15,
        fiber_ratio: 0.2,
        kcal_per_gram: 0.25,
      });
    });
  });
});
