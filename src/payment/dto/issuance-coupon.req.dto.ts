import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class IssuanceCouponReqDto {
  @IsOptional()
  @IsBoolean()
  isValid?: boolean;

  //   @IsDate()
  @IsNotEmpty()
  validFrom: Date;

  //   @IsDate()
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
  user: string; // 유저의 uuid 를 사용

  @IsUUID()
  @IsNotEmpty()
  coupon: string; // 쿠폰의 uuid 을 사용
}
