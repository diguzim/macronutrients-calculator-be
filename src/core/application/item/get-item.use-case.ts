import { Injectable } from '@nestjs/common';
import { ItemNotFoundError } from '../../../utils/errors';
import { ItemRepository } from '../../domain/item/item.repository';

export type GetItemUseCaseParams = {
  id: string;
};

@Injectable()
export class GetItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute({ id }: GetItemUseCaseParams) {
    const item = await this.itemRepository.findBy({ id, isPublic: true });

    if (!item) {
      throw new ItemNotFoundError(id);
    }

    return item;
  }
}
