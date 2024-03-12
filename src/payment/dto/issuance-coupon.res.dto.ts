import { IsBoolean, IsDate, IsNotEmpty, IsUUID } from 'class-validator';

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

  @IsBoolean()
  @IsNotEmpty()
  usedAt: boolean;

  @IsUUID()
  @IsNotEmpty()
  user: string; // 유저의 uuid 를 사용

  @IsUUID()
  @IsNotEmpty()
  coupon: string; // 쿠폰의 uuid 을 사용

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
