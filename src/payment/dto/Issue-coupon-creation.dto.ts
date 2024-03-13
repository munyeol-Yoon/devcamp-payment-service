import { UserModel } from 'src/auth/entities/user.entity';
import { CouponModel } from '../entities/coupon.entity';

export class IssuedCouponCreationDto {
  isValid?: boolean;
  validFrom: Date;
  validUntil: Date;
  isUsed?: boolean;
  usedAt?: boolean;
  user: UserModel;
  coupon: CouponModel;
}
