import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuedCouponModel } from '../entities/IssuedCoupon.entity';
import { IssuanceCouponResDto } from '../dto/issuance-coupon.res.dto';
import { IssuedCouponCreationDto } from '../dto/Issue-coupon-creation.dto';

@Injectable()
export class IssuedCouponRepository {
  constructor(
    @InjectRepository(IssuedCouponModel)
    private readonly repository: Repository<IssuedCouponModel>,
  ) {}

  // TODO - 유효성 검증 필요 -> 이미 발급한 쿠폰인지

  async create(dto: IssuedCouponCreationDto): Promise<IssuanceCouponResDto> {
    const issuedCoupon = this.repository.create(dto);

    const savedCoupon = await this.repository.save(issuedCoupon);

    const resultDto = new IssuanceCouponResDto();
    resultDto.id = savedCoupon['id'];
    resultDto.isValid = savedCoupon['isValid'];
    resultDto.validFrom = savedCoupon['validFrom'];
    resultDto.validUntil = savedCoupon['validUntil'];
    resultDto.isUsed = savedCoupon['isUsed'];
    resultDto.usedAt = savedCoupon['usedAt'];
    resultDto.user = savedCoupon['user'];
    resultDto.coupon = savedCoupon['coupon'];
    resultDto.createdAt = savedCoupon['createdAt'];
    resultDto.updatedAt = savedCoupon['updatedAt'];

    return resultDto;
  }
}
