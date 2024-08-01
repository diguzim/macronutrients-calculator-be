import { ItemNotFoundError } from '../../../utils/errors';
import { mockedItem } from '../../../utils/test/mocked.entities';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  GetPublicItemUseCase,
  GetPublicItemUseCaseParams,
} from './get-public-item.use-case';

describe('GetPublicItemUseCase', () => {
  let useCase: GetPublicItemUseCase;

  const params: GetPublicItemUseCaseParams = {
    id: 'itemId',
  };

  const itemRepository = {
    findBy: jest.fn(() => mockedItem),
  } as unknown as ItemRepository;

  beforeEach(() => {
    useCase = new GetPublicItemUseCase(itemRepository);
  });

  describe('when item is found', () => {
    it('should return item', async () => {
      const items = await useCase.execute(params);

      expect(itemRepository.findBy).toBeCalledWith({
        id: params.id,
        isPublic: true,
      });

      expect(items).toEqual(mockedItem);
    });
  });

  describe('when item is not found', () => {
    it('should throw ItemNotFoundError', async () => {
      itemRepository.findBy = jest.fn(() => undefined);

      await expect(useCase.execute(params)).rejects.toThrowError(
        new ItemNotFoundError(params.id),
      );
    });
  });
});
