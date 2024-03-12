import { Controller } from '@nestjs/common';
import { IssuedCouponService } from '../services/issuedCoupon.service';

@Controller('issued')
export class IssuedCouponController {
  constructor(private readonly issuedCouponService: IssuedCouponService) {}
}
