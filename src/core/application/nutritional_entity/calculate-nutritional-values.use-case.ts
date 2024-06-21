import { Injectable } from '@nestjs/common';
import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { NutritionalEntityNotFoundError } from '../../../utils/errors';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
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
    private readonly cookedDishRepository: CookedDishRepository,
  ) {}

  async execute(
    input: CalculateNutritionalValuesInput,
  ): Promise<NutritionalSnapshot> {
    let nutritionalEntity: NutritionalEntity;
    const nutritionalSnapshots = await Promise.all(
      input.map(async (input) => {
        const { type, id, weight } = input;

        switch (type) {
          case NutritionalEntityType.RawIngredient:
            nutritionalEntity = await this.rawIngredientRepository.findBy({
              id,
            });
            break;
          case NutritionalEntityType.CookedDish:
            nutritionalEntity = await this.cookedDishRepository.findBy({ id });
            break;
        }

        if (!nutritionalEntity) {
          throw new NutritionalEntityNotFoundError(type, id);
        }

        return nutritionalEntity.calculateNutritionalSnapshot(weight);
      }),
    );

    const summedNutritionalSnapshot = nutritionalSnapshots.reduce(
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

    return {
      protein: parseFloat(summedNutritionalSnapshot.protein.toFixed(1)),
      fat: parseFloat(summedNutritionalSnapshot.fat.toFixed(1)),
      carbohydrate: parseFloat(
        summedNutritionalSnapshot.carbohydrate.toFixed(1),
      ),
      fiber: parseFloat(summedNutritionalSnapshot.fiber.toFixed(1)),
      kcal: parseFloat(summedNutritionalSnapshot.kcal.toFixed(1)),
    };
  }
}
