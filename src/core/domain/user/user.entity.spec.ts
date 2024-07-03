import { User } from './user.entity';

describe('User', () => {
  describe('constructor', () => {
    it('creates an instance of User with all fields', () => {
      const date = new Date();

      const user = new User({
        id: '1',
        name: 'user',
        email: 'email@example.com',
        password: 'password',
        createdAt: date,
        updatedAt: date,
      });

      expect(user).toBeInstanceOf(User);

      expect(user.id).toBe('1');
      expect(user.name).toBe('user');
      expect(user.email).toBe('email@example.com');
      expect(user.password).toBe('password');
      expect(user.createdAt).toBe(date);
      expect(user.updatedAt).toBe(date);
    });
  });
});
