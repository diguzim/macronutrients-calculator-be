import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../domain/item/item.repository';
import { User } from '../../domain/user/user.entity';

export type SearchPrivateItemsUseCaseParams = {
  name: string;
  userId: User;
};

@Injectable()
export class SearchPrivateItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute({ name, userId }: SearchPrivateItemsUseCaseParams) {
    return await this.itemRepository.findAllBy({
      name,
      isPublic: false,
    });
  }
}
