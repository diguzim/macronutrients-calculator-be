import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { NutritionalEntityNotFoundError } from '../../../utils/errors';

@Catch(NutritionalEntityNotFoundError)
export class NutritionalEntityNotFoundExceptionFilter
  implements ExceptionFilter
{
  catch(exception: NutritionalEntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).send({
      message: [exception.message],
      error: 'Not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
