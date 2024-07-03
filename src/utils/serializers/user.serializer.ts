import { User } from '../../core/domain/user/user.entity';

export class UserSerializer {
  public static serialize(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return {
      id: rest.id,
      ...rest,
    };
  }
}
