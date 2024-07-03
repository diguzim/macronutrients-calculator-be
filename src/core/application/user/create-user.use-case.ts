import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from '../../../utils/errors/email-already-exists.error';

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: CreateUserParams) {
    const existingUser = await this.userRepository.findBy({
      email: params.email,
    });
    if (existingUser) {
      throw new EmailAlreadyExistsError(params.email);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(params.password, saltRounds);
    const userWithHashedPassword = { ...params, password: hashedPassword };

    return await this.userRepository.create(userWithHashedPassword);
  }
}
