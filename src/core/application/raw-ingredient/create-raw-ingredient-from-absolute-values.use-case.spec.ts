import { mockedRawIngredient } from '../../../utils/test/mocked.entities';
import { mockedRawIngredientRepository } from '../../../utils/test/repositories';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from './create-raw-ingredient-from-absolute-values.use-case';

describe('CreateRawIngredientFromAbsoluteValuesUseCase', () => {
  it('should create a raw ingredient', async () => {
    const repository = new mockedRawIngredientRepository();
    repository.create = jest.fn(() => {
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
    expect(rawIngredient.proteinRatio).toBe(0.2);
    expect(rawIngredient.fatRatio).toBe(0.3);
    expect(rawIngredient.carbohydrateRatio).toBe(0.4);
    expect(rawIngredient.fiberRatio).toBe(0.1);
    expect(rawIngredient.kcalPerGram).toBe(4);

    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
