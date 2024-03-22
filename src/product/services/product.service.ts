import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { ProductReqDto } from '../dto/product.req.dto';
import { ProductResDto } from '../dto/product.res.dto';
import { ProductModel } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(dto: ProductReqDto): Promise<ProductResDto> {
    return this.productRepository.createProduct(dto);
  }

  async getAllProduct(): Promise<ProductModel[]> {
    return this.productRepository.findAll();
  }

  async getProduct(id: string): Promise<ProductResDto> {
    return this.productRepository.findOne(id);
  }
}
