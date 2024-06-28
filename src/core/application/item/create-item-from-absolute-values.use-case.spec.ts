import { mockedItem } from '../../../utils/test/mocked.entities';
import { Item, ItemType } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';
import { CreateItemFromAbsoluteValuesUseCase } from './create-item-from-absolute-values.use-case';

describe('CreateItemFromAbsoluteValuesUseCase', () => {
  it('should create an item and save it with the repository', async () => {
    const itemRepository = {
      create: jest.fn(() => Promise.resolve(mockedItem)),
    } as unknown as ItemRepository;

    const createItemUseCase = new CreateItemFromAbsoluteValuesUseCase(
      itemRepository,
    );

    const props = {
      name: 'Item',
      type: ItemType.RAW,
      weight: 100,
      protein: 20,
      fat: 30,
      carbohydrate: 40,
      fiber: 10,
      kcal: 400,
    };

    const expectedItem = Item.createFromAbsoluteValues(props);
    console.log('expectedItem:', expectedItem);

    await createItemUseCase.execute(props);

    expect(itemRepository.create).toHaveBeenCalledTimes(1);
    expect(itemRepository.create).toHaveBeenCalledWith(expectedItem);

    expect(expectedItem).toBeInstanceOf(Item);
    expect(expectedItem.proteinRatio).toBe(0.2);
    expect(expectedItem.carbohydrateRatio).toBe(0.4);
    expect(expectedItem.fatRatio).toBe(0.3);
    expect(expectedItem.fiberRatio).toBe(0.1);
    expect(expectedItem.kcalPerGram).toBe(4);
  });
});
