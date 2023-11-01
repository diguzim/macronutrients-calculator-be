import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { CookedDishSerializer } from '../../../utils/serializers/cooked-dish.serializer';
import { RawIngredientSerializer } from '../../../utils/serializers/raw-ingredient.serializer';
import { CookedDish } from '../../domain/cooked-dish/cooked-dish.entity';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';
import { GetAllNutritionalEntitiesUseCase } from './get-all-nutritional-entities.use-case';

describe('GetAllNutritionalEntitiesUseCase', () => {
  let getAllNutritionalEntitiesUseCase: GetAllNutritionalEntitiesUseCase;
  let rawIngredientRepository: RawIngredientRepository;
  let cookedDishRepository: CookedDishRepository;

  describe('execute', () => {
    it('should return all nutritional entities', async () => {
      const rawIngredient = RawIngredient.createFromAbsoluteValues({
        name: 'Raw Ingredient',
        weight: 100,
        protein: 10,
        fat: 10,
        carbohydrate: 10,
        fiber: 10,
        kcal: 100,
      });
      rawIngredient.id = '1';

      const cookedDish = CookedDish.createFromRawIngredients(
        'CookedDish',
        [
          {
            raw_ingredient: rawIngredient,
            amount_in_grams: 100,
          },
        ],
        300,
      );
      cookedDish.id = '2';

      const expectedNutritionalEntities = [
        {
          type: NutritionalEntityType.RawIngredient,
          values: [RawIngredientSerializer.serialize(rawIngredient)],
        },
        {
          type: NutritionalEntityType.CookedDish,
          values: [CookedDishSerializer.serialize(cookedDish)],
        },
      ];

      rawIngredientRepository = {
        findAll: jest.fn(() => Promise.resolve([rawIngredient])),
      } as any;
      cookedDishRepository = {
        findAll: jest.fn(() => Promise.resolve([cookedDish])),
      } as any;

      getAllNutritionalEntitiesUseCase = new GetAllNutritionalEntitiesUseCase(
        rawIngredientRepository,
        cookedDishRepository,
      );

      const nutritionalEntities =
        await getAllNutritionalEntitiesUseCase.execute();

      expect(nutritionalEntities).toMatchObject(expectedNutritionalEntities);
    });
  });
});
