import { mockedItem } from '../../../utils/test/mocked.entities';
import { ItemRepository } from '../../domain/item/item.repository';
import { CalculateNutritionalValuesUseCase } from './calculate-nutritional-values.use-case';
import { ItemNotFoundError } from '../../../utils/errors';

describe('CalculateNutritionalValuesUseCase', () => {
  let useCase: CalculateNutritionalValuesUseCase;

  const input = {
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

  const mockedItemRepository = {
    findBy: jest.fn(() => Promise.resolve(mockedItem)),
  } as unknown as ItemRepository;

  beforeEach(() => {
    useCase = new CalculateNutritionalValuesUseCase(mockedItemRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('when all nutritional entities are found', () => {
    it('should calculate nutritional values properly', async () => {
      const nutritionalSnapshot = await useCase.execute(input);

      expect(mockedItemRepository.findBy).toHaveBeenCalledTimes(2);
      expect(nutritionalSnapshot).toStrictEqual({
        protein: 60,
        fat: 90,
        carbohydrate: 120,
        fiber: 30,
        kcal: 1530,
      });
    });
  });

  describe('when some nutritional is not found', () => {
    beforeAll(() => {
      mockedItemRepository.findBy = jest.fn(() => Promise.resolve(null));
    });

    afterAll(() => {
      mockedItemRepository.findBy = jest.fn(() => Promise.resolve(mockedItem));
    });
    it('should throw an error', async () => {
      await expect(useCase.execute(input)).rejects.toThrowError(
        ItemNotFoundError,
      );
    });
  });
});
