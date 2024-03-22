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

  /**
   * save()
   *
   * id 가 포함된 엔티티를 저장할 때 먼저 select 를 이용해 id 로 조회한 뒤에,
   * 레코드가 존재하면 변경된 컬럼에 대해 update 쿼리를 수행한다.
   * select 발생
   * 전체 엔티티를 한번에 업데이트할 때 사용한다.
   *
   * update()
   *
   * 부분적으로 업데이트할 때 사용한다. select 는 발생하지 않는다.
   * Patch 에 적합
   */
  async updateProduct(
    id: string,
    product: ProductModel,
  ): Promise<ProductModel> {
    await this.repository.update({ id }, product);

    const result = this.findOne(id);
    return result;
  }

  async deleteOne(id: string): Promise<Message> {
    await this.repository.delete({ id });

    return { message: 'complete' };
  }
}
