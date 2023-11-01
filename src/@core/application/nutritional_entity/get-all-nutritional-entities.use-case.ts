import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { CookedDishSerializer } from '../../../utils/serializers/cooked-dish.serializer';
import { CookedIngredientSerializer } from '../../../utils/serializers/cooked-ingredient.serializer';
import { RawIngredientSerializer } from '../../../utils/serializers/raw-ingredient.serializer';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { CookedIngredientRepository } from '../../domain/cooked-ingredient/cooked-ingredient.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

export class GetAllNutritionalEntitiesUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
    private readonly cookedIngredientRepository: CookedIngredientRepository,
    private readonly cookedDishRepository: CookedDishRepository,
  ) {}
  async execute() {
    const rawIngredients = await this.rawIngredientRepository.findAll();
    const cookedIngredients = await this.cookedIngredientRepository.findAll();
    const cookedDishes = await this.cookedDishRepository.findAll();
    return [
      {
        type: NutritionalEntityType.RawIngredient,
        values: rawIngredients.map((rawIngredient) =>
          RawIngredientSerializer.serialize(rawIngredient),
        ),
      },
      {
        type: NutritionalEntityType.CookedIngredient,
        values: cookedIngredients.map((cookedIngredient) =>
          CookedIngredientSerializer.serialize(cookedIngredient),
        ),
      },
      {
        type: NutritionalEntityType.CookedDish,
        values: cookedDishes.map((cookedDish) =>
          CookedDishSerializer.serialize(cookedDish),
        ),
      },
    ];
  }
}
