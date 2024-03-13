import { IsBoolean, IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { UserModel } from 'src/auth/entities/user.entity';
import { CouponModel } from '../entities/coupon.entity';

export class IssuanceCouponResDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;

  @IsNotEmpty()
  validFrom: Date;

  @IsNotEmpty()
  validUntil: Date;

  @IsBoolean()
  @IsNotEmpty()
  isUsed: boolean;

  @IsDate()
  @IsNotEmpty()
  usedAt: Date;

  @IsUUID()
  @IsNotEmpty()
  user: UserModel; // 유저의 uuid 를 사용

  @IsUUID()
  @IsNotEmpty()
  coupon: CouponModel; // 쿠폰의 uuid 을 사용

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
