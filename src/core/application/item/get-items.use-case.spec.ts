import { mockedItem } from '../../../utils/test/mocked.entities';
import { Item, ItemType } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';
import { GetItemsUseCase } from './get-items.use-case';

describe('GetItemsUseCase', () => {
  let useCase: GetItemsUseCase;

  const params = {
    name: 'item',
    type: ItemType.RAW,
  } as Partial<Item>;

  const itemRepository = {
    findAllBy: jest.fn(() => [mockedItem]),
  } as unknown as ItemRepository;

  beforeEach(() => {
    useCase = new GetItemsUseCase(itemRepository);
  });

  it('should return items', async () => {
    const items = await useCase.execute(params);

    expect(itemRepository.findAllBy).toBeCalledWith(params);

    expect(items).toEqual([mockedItem]);
  });
});
