import { MockedRawIngredient } from '../../../common/test/mocked.entities';
import { CreateCookedDishFromRawIngredientsUseCase } from './create-cooked-dish-from-raw-ingredients.use-case';

describe('CreateCookedDishFromRawIngredientsUseCase', () => {
  describe('execute', () => {
    it('should create a cooked dish from raw ingredients', async () => {
      const rawIngredientRepository = {
        findOne: jest.fn(() => {
          const result = MockedRawIngredient;
          result.id = 'id';

          return result;
        }),
      };
      const cookedDishRepository = {
        insert: jest.fn(() => ({ id: 'id' })),
      };
      const useCase = new CreateCookedDishFromRawIngredientsUseCase(
        rawIngredientRepository as any,
        cookedDishRepository as any,
      );
      const input = {
        name: 'name',
        raw_ingredients_id_with_amount: [
          {
            raw_ingredient_id: 'id',
            amount_in_grams: 100,
          },
          {
            raw_ingredient_id: 'id',
            amount_in_grams: 200,
          },
        ],
        finalWeightInGrams: 600,
      };

      const cookedDish = await useCase.execute(input);

      expect(cookedDish).toBeDefined();
      expect(cookedDish.id).toBeDefined();
      expect(cookedDish.name).toEqual(input.name);
      expect(cookedDish.protein_ratio).toEqual(0.1);
      expect(cookedDish.fat_ratio).toEqual(0.15);
      expect(cookedDish.carbohydrate_ratio).toEqual(0.2);
      expect(cookedDish.fiber_ratio).toEqual(0.05);
      expect(cookedDish.kcal_per_gram).toEqual(0.5);

      expect(rawIngredientRepository.findOne).toHaveBeenCalledTimes(2);

      expect(cookedDishRepository.insert).toHaveBeenCalledTimes(1);
    });
  });
});
