import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  sensitiveKeys = [
    'password',
    'confirmPassword',
    'currentPassword',
    'newPassword',
  ];

  sanitizeObject(obj: any): any {
    this.sensitiveKeys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    const sanitizedBody = this.sanitizeObject({ ...body });

    const logData = {
      url: originalUrl,
      method,
      params,
      query,
      body: sanitizedBody,
    };
    this.logger.log(logData, 'Request log');
    console.log('Yo', logData);

    return next.handle().pipe(
      tap((data) => {
        const responseLogData = {
          url: originalUrl,
          statusCode,
          data,
        };

        this.logger.log(responseLogData, 'Response log');
      }),
    );
  }
}
