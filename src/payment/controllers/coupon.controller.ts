import { AuthGuard } from 'src/common/guard/auth.guard';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { CouponModel } from '../entities/coupon.entity';
import { CouponService } from './../services/coupon.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async createCoupon(@Body() body: CreateCouponDto): Promise<CouponModel> {
    return await this.couponService.createCoupon(body);
  }
}
