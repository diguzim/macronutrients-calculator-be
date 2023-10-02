import { ICookedIngredientRepository } from '../../../@core/domain/cooked-ingredient/cooked-ingredient.repository';

export const mockedCookedIngredientRepository: ICookedIngredientRepository = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
