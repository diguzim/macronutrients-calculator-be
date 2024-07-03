import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../core/application/user/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserSerializer } from '../../../../utils/serializers/user.serializer';
import { EmailAlreadyExistsExceptionFilter } from '../../exception-filters/email-already-exists.exception-filter';

@Controller('users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UseFilters(EmailAlreadyExistsExceptionFilter)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(createUserDto);

    return UserSerializer.serialize(user);
  }
}
