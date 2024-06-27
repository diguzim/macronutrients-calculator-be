import { Item } from '../../core/domain/item/item.entity';
import { RawIngredient } from '../../core/domain/raw-ingredient/raw-ingredient.entity';

export const mockedRawIngredient = new RawIngredient({
  name: 'Some raw ingredient',
  proteinRatio: 0.2,
  fatRatio: 0.3,
  carbohydrateRatio: 0.4,
  fiberRatio: 0.1,
  kcalPerGram: 1,
});

export const mockedItem = new Item({
  name: 'Some item',
  proteinRatio: 0.2,
  fatRatio: 0.3,
  carbohydrateRatio: 0.4,
  fiberRatio: 0.1,
  kcalPerGram: 5.1,
});
