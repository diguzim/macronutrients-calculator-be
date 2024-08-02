import { Injectable } from '@nestjs/common';
import { ItemNotFoundError } from '../../../utils/errors';
import { ItemRepository } from '../../domain/item/item.repository';

export type GetPrivateItemUseCaseParams = {
  id: string;
  userId: string;
};

@Injectable()
export class GetPrivateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute({ id, userId }: GetPrivateItemUseCaseParams) {
    const item = await this.itemRepository.findBy({
      id,
      isPublic: false,
      userId,
    });

    if (!item) {
      throw new ItemNotFoundError(id);
    }

    return item;
  }
}
