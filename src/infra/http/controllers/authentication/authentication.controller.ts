import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { RegisterUseCase } from '../../../../core/application/authentication/register.use-case';
import { RegisterDto } from './dtos/register.dto';
import { UserSerializer } from '../../../../utils/serializers/user.serializer';
import { EmailAlreadyExistsExceptionFilter } from '../../exception-filters/email-already-exists.exception-filter';

@Controller('auth')
export class AuthenticationController {
  constructor(private registerUseCase: RegisterUseCase) {}

  @Post('register')
  @UseFilters(EmailAlreadyExistsExceptionFilter)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.registerUseCase.execute(registerDto);

    return UserSerializer.serialize(user);
  }
}
