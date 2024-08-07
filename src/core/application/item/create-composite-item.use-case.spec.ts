import { mockedItem } from '../../../utils/test/mocked.entities';
import { Item } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  CreateCompositeItemInput,
  CreateCompositeItemUseCase,
} from './create-composite-item.use-case';

describe('CreateCompositeItemUseCase', () => {
  const input: CreateCompositeItemInput = {
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
    finalWeight: 600,
    userId: '1',
  };

  const expectedCompositeItem = Item.createFromComposition({
    name: input.name,
    itemsWithWeights: [
      {
        item: mockedItem,
        weight: input.itemIdsWithWeights[0].weight,
      },
      {
        item: mockedItem,
        weight: input.itemIdsWithWeights[1].weight,
      },
    ],
    finalWeight: input.finalWeight,
    userId: input.userId,
  });

  const itemRepository = {
    findBy: jest.fn(() => mockedItem),
    create: jest.fn(() => ({
      ...expectedCompositeItem,
      id: 'id3',
    })),
  } as unknown as ItemRepository;

  const useCase = new CreateCompositeItemUseCase(itemRepository);

  describe('execute', () => {
    describe('when some items are private and do not belong to the user', () => {
      beforeAll(() => {
        itemRepository.findBy = jest.fn().mockResolvedValueOnce(null);
      });

      afterAll(() => {
        itemRepository.findBy = jest.fn(() => Promise.resolve(mockedItem));
      });

      it('should throw an error', async () => {
        await expect(useCase.execute(input)).rejects.toThrowError(
          'Item not found',
        );

        // This is called 4 times because the first item is not found on the first request but is found on the second,
        // but the second item is not found neither on the first nor on the second request for this, and then it raises the error
        expect(itemRepository.findBy).toHaveBeenCalledTimes(4);
      });
    });

    describe('when all items are public or belong to the user', () => {
      it('should create a composite item from items', async () => {
        const compositeItem = await useCase.execute(input);
        expect(compositeItem.id).toBe('id3');

        expect(itemRepository.findBy).toHaveBeenCalledTimes(2);

        expect(itemRepository.create).toHaveBeenCalledTimes(1);

        expect(itemRepository.create).toHaveBeenCalledWith(
          expectedCompositeItem,
        );
      });
    });
  });
});
