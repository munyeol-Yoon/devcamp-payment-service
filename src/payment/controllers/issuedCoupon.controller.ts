import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { IssuedCouponService } from '../services/issuedCoupon.service';
import { IssuanceCouponResDto } from '../dto/issuance-coupon.res.dto';
import { IssuanceCouponReqDto } from '../dto/issuance-coupon.req.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('issued')
export class IssuedCouponController {
  constructor(private readonly issuedCouponService: IssuedCouponService) {}

  @Post('coupon')
  async create(
    @Body() body: IssuanceCouponReqDto,
  ): Promise<IssuanceCouponResDto> {
    return this.issuedCouponService.create(body);
  }
}