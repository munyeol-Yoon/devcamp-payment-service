import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { ProductReqDto } from '../dto/product.req.dto';
import { ProductResDto } from '../dto/product.res.dto';
import { ProductModel } from '../entities/product.entity';
import { ProductUpdateReqDto } from '../dto/product-update.req.dto';
import { CustomException } from 'src/http-exception/custom-exception';
import { Message } from 'src/common/types/types';

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
    return await this.existProduct(id);
  }

  async updateProduct(
    id: string,
    dto: ProductUpdateReqDto,
  ): Promise<ProductModel> {
    // 대상이 있는지 유효성 검사
    const product = await this.existProduct(id);

    // 업데이트 가능한 객체로 변경
    // Object.assign : 객체의 속성을 합치거나 기존 객체를 기반으로 새 객체를 생성할 때 활용
    Object.assign(product, dto);

    return this.productRepository.updateProduct(product);
  }

  async deleteProduct(id: string): Promise<Message> {
    await this.existProduct(id);

    return this.productRepository.deleteOne(id);
  }

  async existProduct(id: string): Promise<ProductModel> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new CustomException(
        'product',
        '제품이 존재하지 않습니다.',
        '제품이 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
}
