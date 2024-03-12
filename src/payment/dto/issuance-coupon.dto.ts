import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CouponType } from 'src/common/types/types';

export class IssuanceCouponDto {
  @IsOptional()
  @IsBoolean()
  isValid?: boolean;

  @IsDate()
  @IsNotEmpty()
  validFrom: Date;

  @IsDate()
  @IsNotEmpty()
  validUntil: Date;

  @IsOptional()
  @IsBoolean()
  isUsed?: boolean;

  @IsOptional()
  @IsBoolean()
  usedAt?: boolean;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // 유저의 uuid 를 사용

  @IsString()
  @IsNotEmpty()
  couponType: CouponType; // 쿠폰의 타입을 사용
}
