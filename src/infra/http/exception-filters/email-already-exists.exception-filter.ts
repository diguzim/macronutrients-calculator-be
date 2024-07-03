import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EmailAlreadyExistsError } from '../../../utils/errors/email-already-exists.error';

@Catch(EmailAlreadyExistsError)
export class EmailAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: EmailAlreadyExistsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.CONFLICT).send({
      message: [exception.message],
      error: 'Conflict',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
