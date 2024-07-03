import { JwtService } from '@nestjs/jwt';
import {
  mockedUser,
  mockedUserPassword,
} from '../../../utils/test/mocked.entities';
import { UserRepository } from '../../domain/user/user.repository';
import { LoginUseCase } from './login.use-case';
import { EmailNotFoundError } from '../../../utils/errors/email-not-found.error';
import { InvalidPasswordError } from '../../../utils/errors/invalid-password.error';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;

  const mockedUserRepository = {
    findBy: jest.fn(() => Promise.resolve(mockedUser)),
  } as unknown as UserRepository;

  const mockedJwtService = {
    sign: jest.fn(() => 'someToken'),
  } as unknown as JwtService;

  beforeEach(() => {
    loginUseCase = new LoginUseCase(mockedUserRepository, mockedJwtService);
  });

  const params = {
    email: mockedUser.email,
    password: mockedUserPassword,
  };

  describe('when user is not found', () => {
    beforeAll(() => {
      mockedUserRepository.findBy = jest.fn(() => Promise.resolve(null));
    });

    afterAll(() => {
      mockedUserRepository.findBy = jest.fn(() => Promise.resolve(mockedUser));
    });

    it('should throw a proper error', async () => {
      await expect(loginUseCase.execute(params)).rejects.toThrow(
        EmailNotFoundError,
      );
    });
  });

  describe('when user is found', () => {
    describe('when password is incorrect', () => {
      beforeAll(() => {
        params.password = 'incorrect_password';
      });

      afterAll(() => {
        params.password = mockedUserPassword;
      });

      it('should throw a proper error', async () => {
        await expect(loginUseCase.execute(params)).rejects.toThrow(
          InvalidPasswordError,
        );
      });
    });

    describe('when password is correct', () => {
      it('should sign with JWT and return a token', async () => {
        const result = await loginUseCase.execute(params);

        expect(result).toEqual({ token: 'someToken' });

        expect(mockedJwtService.sign).toHaveBeenCalledWith({
          sub: mockedUser.id,
          email: mockedUser.email,
        });
      });
    });
  });
});
