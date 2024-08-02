import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType();

    if (contextType === 'http') {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest<Request>();

      Logger.log(`Request: ${request.method} ${request.originalUrl}`);
      if (this.isNonEmptyObject(request.body)) {
        Logger.log(`Request body: ${JSON.stringify(request.body)}`);
      }
    } else {
      Logger.log(`Event: ${contextType}`);
      Logger.log(`Arguments: ${JSON.stringify(context.getArgs())}`);
      Logger.log(`Class: ${context.getClass().name}`);
      Logger.log(`Handler: ${context.getHandler().name}`);
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`Execution finished after ${Date.now() - now}ms`)),
      );
  }

  private isNonEmptyObject(data: object) {
    return data && typeof data === 'object' && Object.keys(data).length > 0;
  }
}
