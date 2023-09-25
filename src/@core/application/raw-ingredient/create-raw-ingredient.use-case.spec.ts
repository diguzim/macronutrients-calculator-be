import { mockedRawIngredientRepository } from '../../../common/test/repositories';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { CreateRawIngredientUseCase } from './create-raw-ingredient.use-case';

describe('CreateRawIngredientUseCase', () => {
  it('should create a raw ingredient', async () => {
    const repository = {
      ...mockedRawIngredientRepository,
      insert: jest.fn(() =>
        Promise.resolve({
          id: 'some-id',
        }),
      ),
    };
    const createRawIngredientUseCase = new CreateRawIngredientUseCase(
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
