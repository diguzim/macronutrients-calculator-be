import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../domain/item/item.repository';
import { Item } from '../../domain/item/item.entity';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(params: Partial<Item> = {}) {
    return await this.itemRepository.findAllBy(params);
  }
}
