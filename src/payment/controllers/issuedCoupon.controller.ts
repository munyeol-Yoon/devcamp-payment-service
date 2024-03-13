import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IssuedCouponService } from '../services/issuedCoupon.service';
import { IssuanceCouponResDto } from '../dto/issuance-coupon.res.dto';
import { IssuanceCouponReqDto } from '../dto/issuance-coupon.req.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/auth/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.admin)
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
