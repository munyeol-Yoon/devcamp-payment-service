import { Injectable } from '@nestjs/common';
import { IssuedCouponRepository } from '../repositories/issuedCoupon.repository';

@Injectable()
export class IssuedCouponService {
  constructor(
    private readonly issuedCouponRepository: IssuedCouponRepository,
  ) {}
}
