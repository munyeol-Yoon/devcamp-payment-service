import { AuthGuard } from 'src/common/guard/auth.guard';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { CouponModel } from '../entities/coupon.entity';
import { CouponService } from './../services/coupon.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/common/guard/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.admin)
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async createCoupon(@Body() body: CreateCouponDto): Promise<CouponModel> {
    return await this.couponService.createCoupon(body);
  }

  @Get()
  async getCoupons(): Promise<CouponModel[]> {
    return await this.couponService.getCoupons();
  }
}
