import { mockedUser } from '../../../utils/test/mocked.entities';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import { GetProfileUseCase } from './get-profile.use-case';

describe('GetProfileUseCase', () => {
  let useCase: GetProfileUseCase;
  const userRepository = {
    findBy: jest.fn(() => Promise.resolve(mockedUser)),
  } as unknown as UserRepository;

  beforeEach(() => {
    useCase = new GetProfileUseCase(userRepository);
  });

  const params = { userId: '1' };

  it('should get the user profile', async () => {
    const result = await useCase.execute(params);

    expect(result).toBeInstanceOf(User);
    expect(userRepository.findBy).toBeCalledWith({ id: params.userId });
  });
});
