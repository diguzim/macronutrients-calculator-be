import { CookedIngredientRepository } from '../../../@core/domain/cooked-ingredient/cooked-ingredient.repository';

export const mockedCookedIngredientRepository: CookedIngredientRepository = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
