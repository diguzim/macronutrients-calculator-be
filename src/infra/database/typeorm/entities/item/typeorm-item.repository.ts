import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Item } from '../../../../../core/domain/item/item.entity';
import { ItemRepository } from '../../../../../core/domain/item/item.repository';

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
    const where: FindOptionsWhere<Item> = {};

    // For some fields in params, add a case-insensitive comparison
    Object.entries(params).forEach(([key, value]) => {
      if (key === 'name') {
        where[key] = ILike(`%${value}%`);
      } else {
        where[key] = value;
      }
    });

    const result = await this.itemRepository.find({ where });

    return result.map(this.toEntity);
  }

  private toEntity(item: Item): Item {
    return new Item(item);
  }
}
