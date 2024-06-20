import { mockedRawIngredient } from '../../../utils/test/mocked.entities';
import { mockedRawIngredientRepository } from '../../../utils/test/repositories';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { CreateRawIngredientFromRatiosUseCase } from './create-raw-ingredient-from-ratios.use-case';

describe('CreateRawIngredientFromRatiosUseCase', () => {
  it('should create a raw ingredient', async () => {
    const repository = new mockedRawIngredientRepository();
    repository.insert = jest.fn(() => {
      mockedRawIngredient.id = 'some-id';
      return Promise.resolve(mockedRawIngredient);
    });

    const createRawIngredientUseCase = new CreateRawIngredientFromRatiosUseCase(
      repository,
    );

    const rawIngredient = await createRawIngredientUseCase.execute({
      name: 'Raw ingredient',
      protein_ratio: 0.2,
      fat_ratio: 0.3,
      carbohydrate_ratio: 0.4,
      fiber_ratio: 0.1,
      kcal_per_gram: 1,
    });

    expect(rawIngredient).toBeInstanceOf(RawIngredient);
    expect(rawIngredient).toBeDefined();
    expect(rawIngredient.id).toBeDefined();
    expect(rawIngredient.name).toBe('Raw ingredient');
    expect(rawIngredient.protein_ratio).toBe(0.2);
    expect(rawIngredient.fat_ratio).toBe(0.3);
    expect(rawIngredient.carbohydrate_ratio).toBe(0.4);
    expect(rawIngredient.fiber_ratio).toBe(0.1);
    expect(rawIngredient.kcal_per_gram).toBe(1);

    expect(repository.insert).toHaveBeenCalledTimes(1);
  });
});
