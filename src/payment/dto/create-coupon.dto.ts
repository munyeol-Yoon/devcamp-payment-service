import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  type: 'percent' | 'fixed';

  value: number;
}
