import { FindOptionsWhere, Repository } from 'typeorm';
import { ItemRepository } from '../../../../../core/domain/item/item.repository';
import { Item } from '../../../../../core/domain/item/item.entity';

export class TypeormItemRepository implements ItemRepository {
  constructor(private readonly itemRepository: Repository<Item>) {}

  async create(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  async findBy(params: Partial<Item>): Promise<Item | null> {
    const result = await this.itemRepository.findOne({
      where: params as FindOptionsWhere<Item>,
    });

    return result ? this.toEntity(result) : null;
  }

  async findAllBy(params: Partial<Item>): Promise<Item[]> {
    const result = await this.itemRepository.find({
      where: params as FindOptionsWhere<Item>,
    });

    return result.map(this.toEntity);
  }

  private toEntity(item: Item): Item {
    return new Item(item);
  }
}
