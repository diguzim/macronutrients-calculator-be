import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';

type GetProfileProps = {
  userId: string;
};

@Injectable()
export class GetProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(props: GetProfileProps) {
    return await this.userRepository.findBy({ id: props.userId });
  }
}
