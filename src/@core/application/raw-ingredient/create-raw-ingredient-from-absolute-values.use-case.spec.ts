import { MockedRawIngredient } from '../../../utils/test/mocked.entities';
import { mockedRawIngredientRepository } from '../../../utils/test/repositories';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from './create-raw-ingredient-from-absolute-values.use-case';

describe('CreateRawIngredientFromAbsoluteValuesUseCase', () => {
  it('should create a raw ingredient', async () => {
    const repository = new mockedRawIngredientRepository();
    repository.insert = jest.fn(() => {
      const mockedRawIngredient = MockedRawIngredient;
      mockedRawIngredient.id = 'some-id';
      return Promise.resolve(mockedRawIngredient);
    });

    const createRawIngredientUseCase =
      new CreateRawIngredientFromAbsoluteValuesUseCase(repository);

    const rawIngredient = await createRawIngredientUseCase.execute({
      name: 'Raw ingredient',
      weight: 100,
      protein: 20,
      fat: 30,
      carbohydrate: 40,
      fiber: 10,
      kcal: 400,
    });

    expect(rawIngredient).toBeInstanceOf(RawIngredient);
    expect(rawIngredient).toBeDefined();
    expect(rawIngredient.id).toBeDefined();
    expect(rawIngredient.name).toBe('Raw ingredient');
    expect(rawIngredient.protein_ratio).toBe(0.2);
    expect(rawIngredient.fat_ratio).toBe(0.3);
    expect(rawIngredient.carbohydrate_ratio).toBe(0.4);
    expect(rawIngredient.fiber_ratio).toBe(0.1);
    expect(rawIngredient.kcal_per_gram).toBe(4);

    expect(repository.insert).toHaveBeenCalledTimes(1);
  });
});
