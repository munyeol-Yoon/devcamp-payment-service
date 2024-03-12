import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './custom-exception';
import { Domain } from './custom-exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export type ApiError = {
  id: string;
  domain: Domain;
  message: string;
  apiMessage: string;
  statusCode: HttpStatus;
  timestamp: Date;
};

@Catch(Error, CustomException, HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  catch(
    exception: Error | CustomException | HttpException,
    host: ArgumentsHost,
  ) {
    let status: HttpStatus;
    let body: ApiError;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof CustomException) {
      status = exception.statusCode;
      body = {
        id: exception.id,
        domain: exception.domain,
        message: exception.message,
        apiMessage: exception.apiMessage,
        statusCode: exception.statusCode,
        timestamp: exception.timestamp,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      body = new CustomException(
        'generic',
        exception.message,
        exception.message,
        exception.getStatus(),
      );
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      body = new CustomException(
        'generic',
        `Internal server error ${exception.message}`,
        `Internal server error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const log = `
        >> path: ${req.url}
        >> HttpStatus: ${status},
        >> ErrorMessage: ${exception}`;

    this.logger.error(log);

    res.status(status).json(body);
  }
}
