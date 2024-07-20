import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../domain/item/item.repository';

export type SearchPublicItemsUseCaseParams = {
  name: string;
};

@Injectable()
export class SearchPublicItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute({ name }: SearchPublicItemsUseCaseParams) {
    return await this.itemRepository.findAllBy({ name, isPublic: true });
  }
}
