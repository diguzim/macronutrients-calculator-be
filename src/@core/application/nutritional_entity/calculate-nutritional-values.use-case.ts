import { Injectable } from '@nestjs/common';
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
}[];

@Injectable()
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
    const entries = await Promise.all(
      input.map(async (input) => {
        const { type, id, weight } = input;

        switch (type) {
          case NutritionalEntityType.RawIngredient:
            nutritionalEntity = await this.rawIngredientRepository.findOne(id);
            break;
          case NutritionalEntityType.CookedIngredient:
            nutritionalEntity =
              await this.cookedIngredientRepository.findOne(id);
            break;
          case NutritionalEntityType.CookedDish:
            nutritionalEntity = await this.cookedDishRepository.findOne(id);
            break;
        }

        if (!nutritionalEntity) {
          throw new NutritionalEntityNotFoundError(type, id);
        }

        return nutritionalEntity.calculateNutritionalSnapshot(weight);
      }),
    );

    const nutritionalSnapshot = entries.reduce(
      (acc, curr) => {
        acc.protein += curr.protein;
        acc.fat += curr.fat;
        acc.carbohydrate += curr.carbohydrate;
        acc.fiber += curr.fiber;
        acc.kcal += curr.kcal;

        return acc;
      },
      {
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        fiber: 0,
        kcal: 0,
      },
    );

    return nutritionalSnapshot;
  }
}
