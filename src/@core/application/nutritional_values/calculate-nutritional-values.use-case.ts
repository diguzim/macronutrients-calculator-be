import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { NutritionalEntityNotFoundError } from '../../../utils/errors';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { CookedIngredientRepository } from '../../domain/cooked-ingredient/cooked-ingredient.repository';
import {
  NutritionalEntity,
  NutritionalSnapshot,
} from '../../domain/nutritional-entity/nutritional-entity.entity';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CalculateNutritionalValuesInput = {
  type: NutritionalEntityType;
  id: string;
  weight: number;
};

export class CalculateNutritionalValuesUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
    private readonly cookedIngredientRepository: CookedIngredientRepository,
    private readonly cookedDishRepository: CookedDishRepository,
  ) {}

  async execute(
    input: CalculateNutritionalValuesInput,
  ): Promise<NutritionalSnapshot> {
    let nutritionalEntity: NutritionalEntity;
    const { type, id, weight } = input;

    switch (type) {
      case NutritionalEntityType.RawIngredient:
        nutritionalEntity = await this.rawIngredientRepository.findOne(id);
        break;
      case NutritionalEntityType.CookedIngredient:
        nutritionalEntity = await this.cookedIngredientRepository.findOne(id);
        break;
      case NutritionalEntityType.CookedDish:
        nutritionalEntity = await this.cookedDishRepository.findOne(id);
        break;
    }

    if (!nutritionalEntity) {
      throw new NutritionalEntityNotFoundError(type, id);
    }

    return nutritionalEntity.calculateNutritionalSnapshot(weight);
  }
}
