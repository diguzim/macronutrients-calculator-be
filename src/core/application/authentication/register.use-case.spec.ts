import { mockedUser } from '../../../utils/test/mocked.entities';
import { RegisterUseCase } from './register.use-case';
import { UserRepository } from '../../domain/user/user.repository';
import { EmailAlreadyExistsError } from '../../../utils/errors/email-already-exists.error';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;

  const userRepository: UserRepository = {
    create: jest.fn(),
    findBy: jest.fn().mockResolvedValue(null),
  };

  beforeEach(() => {
    registerUseCase = new RegisterUseCase(userRepository);
  });

  const params = {
    name: 'John Doe',
    email: 'email@example.com',
    password: 'password',
  };

  describe('when user with email already exists', () => {
    beforeAll(() => {
      userRepository.findBy = jest.fn().mockResolvedValue(mockedUser);
    });

    afterAll(() => {
      userRepository.findBy = jest.fn().mockResolvedValue(null);
    });

    it('should throw an error', async () => {
      await expect(registerUseCase.execute(params)).rejects.toThrow(
        new EmailAlreadyExistsError(params.email),
      );
    });
  });

  describe('when user does not exist', () => {
    it('should create a user with hashed password', async () => {
      await registerUseCase.execute(params);

      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'email@example.com',
        password: expect.not.stringContaining('password'),
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'email@example.com',
        password: expect.any(String),
      });
    });
  });
});
