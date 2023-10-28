import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { CookedIngredientRepository } from '../../domain/cooked-ingredient/cooked-ingredient.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';
import { GetAllNutritionalEntitiesUseCase } from './get-all-nutritional-entities.use-case';

describe('GetAllNutritionalEntitiesUseCase', () => {
  let getAllNutritionalEntitiesUseCase: GetAllNutritionalEntitiesUseCase;
  let rawIngredientRepository: RawIngredientRepository;
  let cookedIngredientRepository: CookedIngredientRepository;
  let cookedDishRepository: CookedDishRepository;

  beforeEach(() => {
    rawIngredientRepository = {
      findAll: jest.fn(),
    } as any;
    cookedIngredientRepository = {
      findAll: jest.fn(),
    } as any;
    cookedDishRepository = {
      findAll: jest.fn(),
    } as any;

    getAllNutritionalEntitiesUseCase = new GetAllNutritionalEntitiesUseCase(
      rawIngredientRepository,
      cookedIngredientRepository,
      cookedDishRepository,
    );
  });
});
