import { Item, ItemType } from '../../core/domain/item/item.entity';
import { Meal } from '../../core/domain/meal/meal.entity';
import { User } from '../../core/domain/user/user.entity';
import * as bcrypt from 'bcrypt';

export const mockedItem = new Item({
  name: 'Some item',
  type: ItemType.RAW,
  proteinRatio: 0.2,
  fatRatio: 0.3,
  carbohydrateRatio: 0.4,
  fiberRatio: 0.1,
  kcalPerGram: 5.1,
});

export const mockedUserPassword = 'expected_password';
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(mockedUserPassword, saltRounds);
export const mockedUser = new User({
  name: 'John Doe',
  email: 'email@example.com',
  password: hashedPassword,
});

export const mockedMeal = new Meal({
  name: 'Some meal',
  protein: 10,
  fat: 20,
  carbohydrate: 30,
  fiber: 40,
  kcal: 1000,
});
