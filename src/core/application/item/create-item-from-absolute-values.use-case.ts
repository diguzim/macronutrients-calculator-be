import { Injectable } from '@nestjs/common';
import { Item, ItemType } from '../../domain/item/item.entity';
import { ItemRepository } from '../../domain/item/item.repository';

type CreateItemFromAbsoluteValuesInput = {
  name: string;
  type: ItemType;
  weight: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

@Injectable()
export class CreateItemFromAbsoluteValuesUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: CreateItemFromAbsoluteValuesInput): Promise<Item> {
    const item = Item.createFromAbsoluteValues(input);

    return await this.itemRepository.create(item);
  }
}
