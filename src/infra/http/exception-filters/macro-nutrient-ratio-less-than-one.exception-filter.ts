import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MacroNutrientRatioLessThanOneError } from '../../../utils/errors';

@Catch(MacroNutrientRatioLessThanOneError)
export class MacroNutrientRatioLessThanOneExceptionFilter
  implements ExceptionFilter
{
  catch(exception: MacroNutrientRatioLessThanOneError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).send({
      message: [exception.message],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
