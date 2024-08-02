import { ItemNotFoundError } from '../../../utils/errors';
import { mockedItem } from '../../../utils/test/mocked.entities';
import { Item } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';
import {
  GetPrivateItemUseCase,
  GetPrivateItemUseCaseParams,
} from './get-private-item.use-case';

describe('GetPrivateItemUseCase', () => {
  let useCase: GetPrivateItemUseCase;

  const params: GetPrivateItemUseCaseParams = {
    id: 'itemId',
    userId: 'userId',
  };

  const itemRepository = {
    findBy: jest.fn(() =>
      Promise.resolve(new Item({ ...mockedItem, userId: params.userId })),
    ),
  } as unknown as ItemRepository;

  beforeEach(() => {
    useCase = new GetPrivateItemUseCase(itemRepository);
  });

  describe('when item is not found', () => {
    it('should throw ItemNotFoundError', async () => {
      itemRepository.findBy = jest.fn(() => undefined);

      await expect(useCase.execute(params)).rejects.toThrowError(
        new ItemNotFoundError(params.id),
      );
    });
  });

  describe('when item is found', () => {
    describe('when item is not owned by user', () => {
      beforeAll(() => {
        itemRepository.findBy = jest.fn(() => Promise.resolve(null));
      });

      afterAll(() => {
        itemRepository.findBy = jest.fn(() =>
          Promise.resolve(new Item({ ...mockedItem, userId: params.userId })),
        );
      });

      it('should throw ItemNotFoundError', async () => {
        await expect(useCase.execute(params)).rejects.toThrowError(
          new ItemNotFoundError(params.id),
        );
      });
    });

    describe('when item is owned by user', () => {
      beforeAll(() => {
        jest.clearAllMocks();
      });

      it('should return item', async () => {
        const item = await useCase.execute(params);

        expect(itemRepository.findBy).toBeCalledWith({
          id: params.id,
          isPublic: false,
          userId: params.userId,
        });

        expect(item).toEqual({
          ...mockedItem,
          userId: params.userId,
        });
      });
    });
  });
});
