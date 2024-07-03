import { User } from './user.entity';

export abstract class UserRepository {
  abstract create(item: User): Promise<User>;
  abstract findBy(params: Partial<User>): Promise<User | null>;
}
