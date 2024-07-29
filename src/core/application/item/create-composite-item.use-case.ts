import { Injectable } from '@nestjs/common';
import { Item } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';

export type CreateCompositeItemInput = {
  name: string;
  itemIdsWithWeights: {
    itemId: string;
    weight: number;
  }[];
  finalWeight;
  userId: string;
};

@Injectable()
export class CreateCompositeItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: CreateCompositeItemInput) {
    const { name, itemIdsWithWeights, finalWeight, userId } = input;

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

    const compositeItem = Item.createFromComposition({
      name,
      itemsWithWeights,
      finalWeight,
      userId,
    });

    return await this.itemRepository.create(compositeItem);
  }
}
