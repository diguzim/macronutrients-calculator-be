import { CreateCookedIngredientFromRawIngredientUseCase } from './create-cooked-ingredient-from-raw-ingredient.use-case';

describe('CreateCookedIngredientFromRawIngredientUseCase', () => {
  it('should create a cooked ingredient from a raw ingredient', async () => {
    const rawIngredientRepository = {
      findOne: jest.fn(() =>
        Promise.resolve({
          id: 'some-id',
          name: 'Raw ingredient',
          protein_ratio: 0.2,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.4,
          fiber_ratio: 0.1,
          kcal_per_gram: 1,
        }),
      ),
    };
    const cookedIngredientRepository = {
      insert: jest.fn(() =>
        Promise.resolve({
          id: 'some-id',
        }),
      ),
    };
    const createCookedIngredientFromRawIngredientUseCase =
      new CreateCookedIngredientFromRawIngredientUseCase(
        rawIngredientRepository as any,
        cookedIngredientRepository as any,
      );

    const cookedIngredient =
      await createCookedIngredientFromRawIngredientUseCase.execute({
        raw_ingredient_id: 'some-id',
        name: 'Cooked ingredient',
        initialWeightInGrams: 100,
        finalWeightInGrams: 200,
      });

    expect(cookedIngredient).toBeDefined();
    expect(cookedIngredient.id).toBeDefined();
    expect(cookedIngredient.name).toBe('Cooked ingredient');
    expect(cookedIngredient.protein_ratio).toBe(0.1);
    expect(cookedIngredient.fat_ratio).toBe(0.15);
    expect(cookedIngredient.carbohydrate_ratio).toBe(0.2);
    expect(cookedIngredient.fiber_ratio).toBe(0.05);
    expect(cookedIngredient.kcal_per_gram).toBe(0.5);

    expect(rawIngredientRepository.findOne).toHaveBeenCalledTimes(1);
    expect(cookedIngredientRepository.insert).toHaveBeenCalledTimes(1);
  });
});
