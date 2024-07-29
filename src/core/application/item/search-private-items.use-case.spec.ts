import { mockedItem } from '../../../utils/test/mocked.entities';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  SearchPrivateItemsUseCase,
  SearchPrivateItemsUseCaseParams,
} from './search-private-items.use-case';

describe('SearchPrivateItemsUseCase', () => {
  let useCase: SearchPrivateItemsUseCase;

  const input: SearchPrivateItemsUseCaseParams = {
    name: 'item',
    userId: '1',
  };

  const itemRepository = {
    findAllBy: jest.fn(() => [mockedItem]),
  } as unknown as ItemRepository;

  beforeEach(() => {
    useCase = new SearchPrivateItemsUseCase(itemRepository);
  });

  it('should return items', async () => {
    const items = await useCase.execute(input);

    expect(itemRepository.findAllBy).toBeCalledWith({
      name: input.name,
      isPublic: false,
      userId: input.userId,
    });

    expect(items).toEqual([mockedItem]);
  });
});
