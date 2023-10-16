import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { NegativeCaloriesError } from '../../../utils/errors';

@Catch(NegativeCaloriesError)
export class NegativeCaloriesErrorExceptionFilter implements ExceptionFilter {
  catch(exception: NegativeCaloriesError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).send({
      message: [exception.message],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
