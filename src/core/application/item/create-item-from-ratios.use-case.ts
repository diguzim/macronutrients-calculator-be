import { Injectable } from '@nestjs/common';
import { Item, ItemType } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';

export type CreateItemFromRatiosInput = {
  name: string;
  userId: string;
  type: ItemType;
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
};

@Injectable()
export class CreateItemFromRatiosUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: CreateItemFromRatiosInput): Promise<Item> {
    const item = new Item(input);

    return await this.itemRepository.create(item);
  }
}
