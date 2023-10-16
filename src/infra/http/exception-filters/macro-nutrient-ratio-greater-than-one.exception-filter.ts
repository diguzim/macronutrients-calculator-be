import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MacroNutrientRatioGreaterThanOneError } from '../../../utils/errors';

@Catch(MacroNutrientRatioGreaterThanOneError)
export class MacroNutrientRatioGreaterThanOneExceptionFilter
  implements ExceptionFilter
{
  catch(exception: MacroNutrientRatioGreaterThanOneError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).send({
      message: [exception.message],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
