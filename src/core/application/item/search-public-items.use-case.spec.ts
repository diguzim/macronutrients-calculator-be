import { mockedItem } from '../../../utils/test/mocked.entities';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  SearchPublicItemsUseCase,
  SearchPublicItemsUseCaseParams,
} from './search-public-items.use-case';

describe('SearchPublicItemsUseCase', () => {
  let useCase: SearchPublicItemsUseCase;

  const params: SearchPublicItemsUseCaseParams = {
    name: 'item',
  };

  const itemRepository = {
    findAllBy: jest.fn(() => [mockedItem]),
  } as unknown as ItemRepository;

  beforeEach(() => {
    useCase = new SearchPublicItemsUseCase(itemRepository);
  });

  it('should return items', async () => {
    const items = await useCase.execute(params);

    expect(itemRepository.findAllBy).toBeCalledWith({
      name: params.name,
      isPublic: true,
    });

    expect(items).toEqual([mockedItem]);
  });
});
