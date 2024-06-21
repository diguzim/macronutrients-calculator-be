import { mockedRawIngredient } from '../../../utils/test/mocked.entities';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';
import { CreateCookedDishFromRawIngredientsUseCase } from './create-cooked-dish-from-raw-ingredients.use-case';

describe('CreateCookedDishFromRawIngredientsUseCase', () => {
  describe('execute', () => {
    it('should create a cooked dish from raw ingredients', async () => {
      const rawIngredientRepository = {
        findBy: jest.fn(() => {
          const result = mockedRawIngredient;
          result.id = 'id';

          return result;
        }),
      } as unknown as RawIngredientRepository;

      const cookedDishRepository = {
        create: jest.fn(() => ({ id: 'id' })),
      } as unknown as CookedDishRepository;

      const useCase = new CreateCookedDishFromRawIngredientsUseCase(
        rawIngredientRepository,
        cookedDishRepository,
      );

      const input = {
        name: 'name',
        rawIngredientIdWithAmount: [
          {
            rawIngredientId: 'id',
            amountInGrams: 100,
          },
          {
            rawIngredientId: 'id',
            amountInGrams: 200,
          },
        ],
        finalWeightInGrams: 600,
      };

      const cookedDish = await useCase.execute(input);

      expect(cookedDish).toBeDefined();
      expect(cookedDish.id).toBeDefined();
      expect(cookedDish.name).toEqual(input.name);
      expect(cookedDish.proteinRatio).toEqual(0.1);
      expect(cookedDish.fatRatio).toEqual(0.15);
      expect(cookedDish.carbohydrateRatio).toEqual(0.2);
      expect(cookedDish.fiberRatio).toEqual(0.05);
      expect(cookedDish.kcalPerGram).toEqual(0.5);

      expect(rawIngredientRepository.findBy).toHaveBeenCalledTimes(2);

      expect(cookedDishRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
