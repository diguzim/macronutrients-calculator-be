import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EmailNotFoundError } from '../../../utils/errors/email-not-found.error';
import { InvalidPasswordError } from '../../../utils/errors/invalid-password.error';

@Catch(EmailNotFoundError, InvalidPasswordError)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.UNAUTHORIZED).send({
      message: 'Invalid email or password.',
      error: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
