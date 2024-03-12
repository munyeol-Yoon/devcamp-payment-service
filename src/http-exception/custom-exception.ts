import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export type Domain = 'user' | 'generic' | 'pipe' | 'auth' | 'coupon';

export class CustomException extends Error {
  public readonly id: string;
  public readonly timestamp: Date;

  constructor(
    public readonly domain: Domain,
    public readonly message: string,
    public readonly apiMessage: string,
    public readonly statusCode: HttpStatus,
  ) {
    super(message);
    this.id = uuid();
    this.timestamp = new Date();
  }
}
