import { Injectable } from '@nestjs/common';
import { ItemNotFoundError } from '../../../utils/errors';
import { ItemRepository } from '../../domain/item/item.repository';

export type GetPublicItemUseCaseParams = {
  id: string;
};

@Injectable()
export class GetPublicItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute({ id }: GetPublicItemUseCaseParams) {
    const item = await this.itemRepository.findBy({ id, isPublic: true });

    if (!item) {
      throw new ItemNotFoundError(id);
    }

    return item;
  }
}
