import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailNotFoundError } from '../../../utils/errors/email-not-found.error';
import { InvalidPasswordError } from '../../../utils/errors/invalid-password.error';

type LoginParams = {
  email: string;
  password: string;
};

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(params: LoginParams) {
    const user = await this.userRepository.findBy({
      email: params.email,
    });
    if (!user) {
      throw new EmailNotFoundError(params.email);
    }

    const isPasswordCorrect = await bcrypt.compare(
      params.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new InvalidPasswordError();
    }

    const signPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(signPayload);

    return {
      token,
    };
  }
}
