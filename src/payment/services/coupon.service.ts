import { Injectable } from '@nestjs/common';
import { CouponRepository } from '../repositories/coupon.repository';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}
}
