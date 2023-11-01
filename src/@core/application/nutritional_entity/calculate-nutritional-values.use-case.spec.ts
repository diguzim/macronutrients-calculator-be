import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { NutritionalEntityNotFoundError } from '../../../utils/errors';
import { CookedDish } from '../../domain/cooked-dish/cooked-dish.entity';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { CalculateNutritionalValuesUseCase } from './calculate-nutritional-values.use-case';

describe('CalculateNutritionalValuesUseCase', () => {
  let type: NutritionalEntityType;
  const id = 'some-id';
  const weight = 100;

  it('should calculate nutritional values for a raw ingredient', async () => {
    type = NutritionalEntityType.RawIngredient;

    const rawIngredientRepository = {
      findOne: jest.fn(() => {
        const rawIngredient = RawIngredient.createFromRatios({
          name: 'Raw ingredient',
          protein_ratio: 0.2,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.4,
          fiber_ratio: 0.1,
          kcal_per_gram: 1,
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

    expect(rawIngredientRepository.findOne).toHaveBeenCalledWith(id);
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
      findOne: jest.fn(() => {
        const rawIngredient = RawIngredient.createFromRatios({
          name: 'Raw ingredient',
          protein_ratio: 0.2,
          fat_ratio: 0.3,
          carbohydrate_ratio: 0.4,
          fiber_ratio: 0.1,
          kcal_per_gram: 1,
        });

        const cookedDish = CookedDish.createFromRawIngredients(
          'Cooked dish',
          [{ raw_ingredient: rawIngredient, amount_in_grams: 100 }],
          200,
        );

        cookedDish.id = id;

        return Promise.resolve(cookedDish);
      }),
    };

    const calculateNutritionalValuesUseCase =
      new CalculateNutritionalValuesUseCase(
        null as any,
        cookedDishRepository as any,
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

    expect(cookedDishRepository.findOne).toHaveBeenCalledWith(id);
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
      findOne: jest.fn(() => Promise.resolve(null)),
    };

    const calculateNutritionalValuesUseCase =
      new CalculateNutritionalValuesUseCase(
        rawIngredientRepository as any,
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

    expect(rawIngredientRepository.findOne).toHaveBeenCalledWith(id);
  });
});
