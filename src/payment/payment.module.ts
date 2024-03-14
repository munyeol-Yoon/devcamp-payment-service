import { Module } from '@nestjs/common';
import { CouponController } from './controllers/coupon.controller';
import { CouponService } from './services/coupon.service';
import { CouponRepository } from './repositories/coupon.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponModel } from './entities/coupon.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/auth/user.repository';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { UserModel } from 'src/auth/entities/user.entity';
import { IssuedCouponModel } from './entities/IssuedCoupon.entity';
import { IssuedCouponController } from './controllers/issuedCoupon.controller';
import { IssuedCouponService } from './services/issuedCoupon.service';
import { IssuedCouponRepository } from './repositories/issuedCoupon.repository';
import { PointModel } from './entities/point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CouponModel,
      UserModel,
      IssuedCouponModel,
      PointModel,
    ]),
  ],
  controllers: [CouponController, IssuedCouponController],
  providers: [
    JwtService,
    AuthService,
    AuthGuard,

    UserRepository,

    CouponService,
    CouponRepository,

    IssuedCouponService,
    IssuedCouponRepository,
  ],
})
export class PaymentModule {}
