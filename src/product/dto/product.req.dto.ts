import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStatus } from '../entities/product.entity';

export class ProductReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  description: string;

  @IsString()
  status: ProductStatus;
}
