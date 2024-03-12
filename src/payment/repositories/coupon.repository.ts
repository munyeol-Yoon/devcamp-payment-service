import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponModel } from '../entities/coupon.entity';
import { Repository } from 'typeorm';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { CouponType } from 'src/common/types/types';

@Injectable()
export class CouponRepository {
  constructor(
    @InjectRepository(CouponModel)
    private readonly repository: Repository<CouponModel>,
  ) {}

  async createCoupon(dto: CreateCouponDto): Promise<CouponModel> {
    const coupon = this.repository.create(dto);
    return await this.repository.save(coupon);
  }

  async findByType(type: CouponType): Promise<CouponModel> {
    return await this.repository.findOneBy({ type });
  }
}
