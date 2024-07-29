import { mockedItem } from '../../../utils/test/mocked.entities';
import { Item, ItemType } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  CreateItemFromRatiosInput,
  CreateItemFromRatiosUseCase,
} from './create-item-from-ratios.use-case';

describe('CreateItemFromRatiosUseCase', () => {
  it('should create an item and save it with the repository', async () => {
    const itemRepository = {
      create: jest.fn(() => Promise.resolve(mockedItem)),
    } as unknown as ItemRepository;

    const createItemUseCase = new CreateItemFromRatiosUseCase(itemRepository);

    const input: CreateItemFromRatiosInput = {
      name: 'Item',
      userId: '1',
      type: ItemType.RAW,
      proteinRatio: 0.1,
      fatRatio: 0.2,
      carbohydrateRatio: 0.3,
      fiberRatio: 0.4,
      kcalPerGram: 10,
    };

    await createItemUseCase.execute(input);

    expect(itemRepository.create).toHaveBeenCalledTimes(1);
    expect(itemRepository.create).toHaveBeenCalledWith(new Item(input));
  });
});
