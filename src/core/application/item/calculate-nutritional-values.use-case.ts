import { Injectable } from '@nestjs/common';
import { ItemNotFoundError } from '../../../utils/errors';
import { ItemRepository } from '../../domain/item/item.repository';
import { approximatelyParseFloat } from '../../../utils/math-utils/floating-point';
import { NutritionalSnapshot } from '../../domain/item/item.entity';

type CalculateNutritionalValuesInput = {
  itemIdsWithWeights: {
    itemId: string;
    weight: number;
  }[];
};

@Injectable()
export class CalculateNutritionalValuesUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    input: CalculateNutritionalValuesInput,
  ): Promise<NutritionalSnapshot> {
    const { itemIdsWithWeights } = input;

    const nutritionalSnapshots = await Promise.all(
      itemIdsWithWeights.map(async (input) => {
        const { itemId: id, weight } = input;

        const item = await this.itemRepository.findBy({
          id,
        });

        if (!item) {
          throw new ItemNotFoundError(id);
        }

        return item.calculateNutritionalSnapshot(weight);
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
      protein: approximatelyParseFloat(summedNutritionalSnapshot.protein),
      fat: approximatelyParseFloat(summedNutritionalSnapshot.fat),
      carbohydrate: approximatelyParseFloat(
        summedNutritionalSnapshot.carbohydrate,
      ),
      fiber: approximatelyParseFloat(summedNutritionalSnapshot.fiber),
      kcal: approximatelyParseFloat(summedNutritionalSnapshot.kcal),
    };
  }
}
