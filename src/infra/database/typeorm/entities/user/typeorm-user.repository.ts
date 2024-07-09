import { FindOptionsWhere, Repository } from 'typeorm';
import { UserRepository } from '../../../../../core/domain/user/user.repository';
import { User } from '../../../../../core/domain/user/user.entity';

export class TypeormUserRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findBy(params: Partial<User>): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: params as FindOptionsWhere<User>,
    });

    return result ? this.toEntity(result) : null;
  }

  private toEntity(user: User): User {
    return new User(user);
  }
}
