import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './custom-exception';
import { Domain } from './custom-exception';

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
  constructor() {}

  catch(
    exception: Error | CustomException | HttpException,
    host: ArgumentsHost,
  ) {
    let status: HttpStatus;
    let body: ApiError;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

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

    res.status(status).json(body);
  }
}
