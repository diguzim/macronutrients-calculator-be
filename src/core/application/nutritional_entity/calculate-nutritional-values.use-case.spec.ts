import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { NutritionalEntityNotFoundError } from '../../../utils/errors';
import { CookedDish } from '../../domain/cooked-dish/cooked-dish.entity';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';
import { CalculateNutritionalValuesUseCase } from './calculate-nutritional-values.use-case';

describe('CalculateNutritionalValuesUseCase', () => {
  let type: NutritionalEntityType;
  const id = 'some-id';
  const weight = 100;

  it('should calculate nutritional values for a raw ingredient', async () => {
    type = NutritionalEntityType.RawIngredient;

    const rawIngredientRepository = {
      findBy: jest.fn(() => {
        const rawIngredient = new RawIngredient({
          name: 'Raw ingredient',
          proteinRatio: 0.2,
          fatRatio: 0.3,
          carbohydrateRatio: 0.4,
          fiberRatio: 0.1,
          kcalPerGram: 1,
        });

        rawIngredient.id = id;

        return Promise.resolve(rawIngredient);
      }),
    };

    const calculateNutritionalValuesUseCase =
      new CalculateNutritionalValuesUseCase(
        rawIngredientRepository as any,
        null as any,
      );

    const nutritionalSnapshot = await calculateNutritionalValuesUseCase.execute(
      [
        {
          type,
          id,
          weight,
        },
      ],
    );

    expect(rawIngredientRepository.findBy).toHaveBeenCalledWith({ id });
    expect(nutritionalSnapshot).toStrictEqual({
      protein: 20,
      fat: 30,
      carbohydrate: 40,
      fiber: 10,
      kcal: 100,
    });
  });

  it('should calculate nutritional values for a cooked dish', async () => {
    type = NutritionalEntityType.CookedDish;

    const cookedDishRepository = {
      findBy: jest.fn(() => {
        const rawIngredient = new RawIngredient({
          name: 'Raw ingredient',
          proteinRatio: 0.2,
          fatRatio: 0.3,
          carbohydrateRatio: 0.4,
          fiberRatio: 0.1,
          kcalPerGram: 1,
        });

        const cookedDish = CookedDish.createFromRawIngredientsAmounts(
          'Cooked dish',
          [{ rawIngredient: rawIngredient, amountInGrams: 100 }],
          200,
        );

        cookedDish.id = id;

        return Promise.resolve(cookedDish);
      }),
    } as unknown as CookedDishRepository;

    const calculateNutritionalValuesUseCase =
      new CalculateNutritionalValuesUseCase(null as any, cookedDishRepository);

    const nutritionalSnapshot = await calculateNutritionalValuesUseCase.execute(
      [
        {
          type,
          id,
          weight,
        },
      ],
    );

    expect(cookedDishRepository.findBy).toHaveBeenCalledWith({ id });
    expect(nutritionalSnapshot).toStrictEqual({
      protein: 10,
      fat: 15,
      carbohydrate: 20,
      fiber: 5,
      kcal: 50,
    });
  });

  it('should throw an error if the nutritional entity is not found', async () => {
    type = NutritionalEntityType.RawIngredient;

    const rawIngredientRepository = {
      findBy: jest.fn(() => Promise.resolve(null)),
    } as unknown as RawIngredientRepository;

    const calculateNutritionalValuesUseCase =
      new CalculateNutritionalValuesUseCase(
        rawIngredientRepository,
        null as any,
      );

    await expect(
      calculateNutritionalValuesUseCase.execute([
        {
          type,
          id,
          weight,
        },
      ]),
    ).rejects.toThrowError(new NutritionalEntityNotFoundError(type, id));

    expect(rawIngredientRepository.findBy).toHaveBeenCalledWith({ id });
  });
});
