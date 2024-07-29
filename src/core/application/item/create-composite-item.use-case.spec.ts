import { mockedItem } from '../../../utils/test/mocked.entities';
import { Item } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  CreateCompositeItemInput,
  CreateCompositeItemUseCase,
} from './create-composite-item.use-case';

describe('CreateCompositeItemUseCase', () => {
  describe('execute', () => {
    it('should create a composite item from items', async () => {
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

      const compositeItem = await useCase.execute(input);
      expect(compositeItem.id).toBe('id3');

      expect(itemRepository.findBy).toHaveBeenCalledTimes(2);

      expect(itemRepository.create).toHaveBeenCalledTimes(1);

      expect(itemRepository.create).toHaveBeenCalledWith(expectedCompositeItem);
    });
  });
});
