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

@Module({
  imports: [TypeOrmModule.forFeature([CouponModel, UserModel])],
  controllers: [CouponController],
  providers: [
    CouponService,
    CouponRepository,
    JwtService,
    UserRepository,
    AuthService,
    AuthGuard,
  ],
})
export class PaymentModule {}
