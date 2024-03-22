import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductReqDto } from '../dto/product.req.dto';
import { ProductResDto } from '../dto/product.res.dto';
import { Message } from 'src/common/types/types';

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

  // TODO 시간순 정렬 추가해야함
  async findAll(): Promise<ProductModel[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<ProductModel> {
    return await this.repository.findOneBy({ id });
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    return await this.repository.save(product);
  }

  async deleteOne(id: string): Promise<Message> {
    await this.repository.delete({ id });

    return { message: 'complete' };
  }
}
