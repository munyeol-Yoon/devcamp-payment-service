import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductReqDto } from '../dto/product.req.dto';
import { ProductResDto } from '../dto/product.res.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repository: Repository<ProductModel>,
  ) {}

  async createProduct(dto: ProductReqDto): Promise<ProductResDto> {
    const product = this.repository.create(dto);
    return await this.repository.save(product);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.repository.find();
  }
}
