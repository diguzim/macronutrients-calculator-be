import { mockedItem, mockedMeal } from '../../../utils/test/mocked.entities';
import { ItemRepository } from '../../domain/item/item.repository';
import { MealRepository } from '../../domain/meal/meal.repository';
import { CreateMealFromItemsUseCase } from './create-meal-from-items.use-case';

describe('CreateMealFromItemsUseCase', () => {
  let useCase: CreateMealFromItemsUseCase;

  const itemRepository = {
    findBy: jest.fn(() => mockedItem),
  } as unknown as ItemRepository;

  const mealRepository = {
    create: jest.fn(() => mockedMeal),
  } as unknown as MealRepository;

  const input = {
    name: 'name',
    itemIdsWithWeights: [
      {
        itemId: 'id1',
        weight: 100,
      },
      {
        itemId: 'id2',
        weight: 200,
      },
    ],
  };

  beforeEach(() => {
    useCase = new CreateMealFromItemsUseCase(itemRepository, mealRepository);
  });

  describe('when could not find an item', () => {
    beforeAll(() => {
      itemRepository.findBy = jest.fn(() => null);
    });

    it('should throw an error', async () => {
      await expect(useCase.execute(input)).rejects.toThrow('Item not found');
    });
  });

  describe('when all items are found', () => {
    it('should create a meal from items with proper values', async () => {
      const meal = await useCase.execute(input);

      expect(meal).toBe(mockedMeal);

      expect(itemRepository.findBy).toHaveBeenCalledTimes(2);

      expect(mealRepository.create).toHaveBeenCalledTimes(1);

      expect(mealRepository.create).toHaveBeenCalledWith({
        name: input.name,
        carbohydrate: 120,
        fat: 90,
        fiber: 30,
        kcal: 1530,
        protein: 60,
      });
    });
  });
});
