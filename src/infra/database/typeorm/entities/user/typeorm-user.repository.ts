import { FindOptionsWhere, Repository } from 'typeorm';
import { UserRepository } from '../../../../../core/domain/user/user.repository';
import { User } from '../../../../../core/domain/user/user.entity';

export class TypeormUserRepository implements UserRepository {
  constructor(private readonly itemRepository: Repository<User>) {}

  async create(item: User): Promise<User> {
    return this.itemRepository.save(item);
  }

  async findBy(params: Partial<User>): Promise<User | null> {
    const result = await this.itemRepository.findOne({
      where: params as FindOptionsWhere<User>,
    });

    return result ? this.toEntity(result) : null;
  }

  private toEntity(item: User): User {
    return new User(item);
  }
}
