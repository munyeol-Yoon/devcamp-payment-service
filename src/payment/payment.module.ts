import { Module } from '@nestjs/common';
import { CouponController } from './controllers/coupon.controller';
import { CouponService } from './services/coupon.service';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  controllers: [CouponController],
  providers: [CouponService, CouponRepository],
})
export class PaymentModule {}
