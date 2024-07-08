import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../domain/item/item.repository';
import { MealRepository } from '../../domain/meal/meal.repository';
import { Meal } from '../../domain/meal/meal.entity';

type CreateMealFromItemsInput = {
  name: string;
  itemIdsWithWeights: {
    itemId: string;
    weight: number;
  }[];
};

@Injectable()
export class CreateMealFromItemsUseCase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly mealRepository: MealRepository,
  ) {}

  async execute(input: CreateMealFromItemsInput) {
    const { name, itemIdsWithWeights } = input;

    const itemsWithWeights = await Promise.all(
      itemIdsWithWeights.map(async (itemIdWithWeight) => {
        const item = await this.itemRepository.findBy({
          id: itemIdWithWeight.itemId,
        });

        if (!item) {
          throw new Error('Item not found');
        }

        return {
          item,
          weight: itemIdWithWeight.weight,
        };
      }),
    );

    const meal = Meal.createFromItems(name, itemsWithWeights);
    console.log('meal:', meal);

    return await this.mealRepository.create(meal);
  }
}
