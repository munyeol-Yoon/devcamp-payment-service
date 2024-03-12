import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  type: 'percent' | 'fixed';

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
