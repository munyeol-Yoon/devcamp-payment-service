import { HttpStatus, Injectable } from '@nestjs/common';
import { CouponRepository } from '../repositories/coupon.repository';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { CouponModel } from '../entities/coupon.entity';
import { CouponType } from 'src/common/types/types';
import { CustomException } from 'src/http-exception/custom-exception';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async createCoupon(dto: CreateCouponDto): Promise<CouponModel> {
    await this.typeCheck(dto.type);
    const value = this.couponClassification(dto.type);
    const coupon = {
      type: dto.type,
      value,
    };

    return await this.couponRepository.createCoupon(coupon);
  }

  // 중복확인 추가
  async typeCheck(type: CouponType): Promise<boolean> {
    const existType = await this.couponRepository.findByType(type);
    if (existType) {
      throw new CustomException(
        'coupon',
        '쿠폰 타입이 이미 존재합니다.',
        '쿠폰 타입이 이미 존재합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  couponClassification(type: CouponType): number {
    if (type === 'fixed') {
      return 0.3;
    } else if (type === 'percent') {
      return 5000;
    } else {
      throw new CustomException(
        'coupon',
        '쿠폰 타입을 확인해주세요.',
        '쿠폰 타입을 확인해주세요.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
