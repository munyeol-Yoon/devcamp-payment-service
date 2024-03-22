import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '../entities/product.entity';
import { Type } from 'class-transformer';

export class ProductReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: ProductStatus;
}
