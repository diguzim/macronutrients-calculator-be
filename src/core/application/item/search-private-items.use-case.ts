import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../domain/item/item.repository';

export type SearchPrivateItemsUseCaseParams = {
  name: string;
  userId: string;
};

@Injectable()
export class SearchPrivateItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute({ name, userId }: SearchPrivateItemsUseCaseParams) {
    return await this.itemRepository.findAllBy({
      name,
      isPublic: false,
      userId,
    });
  }
}
