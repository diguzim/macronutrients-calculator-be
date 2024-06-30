import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ItemNotFoundError } from '../../../utils/errors';

@Catch(ItemNotFoundError)
export class ItemNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ItemNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).send({
      message: [exception.message],
      error: 'Not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
