import { RawIngredientRepository } from '../../../@core/domain/raw-ingredient/raw-ingredient.repository';

export const mockedRawIngredientRepository: RawIngredientRepository = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
