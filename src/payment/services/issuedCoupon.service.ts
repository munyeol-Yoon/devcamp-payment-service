import { HttpStatus, Injectable } from '@nestjs/common';
import { IssuedCouponRepository } from '../repositories/issuedCoupon.repository';
import { CouponRepository } from '../repositories/coupon.repository';
import { UserRepository } from 'src/auth/user.repository';
import { CouponModel } from '../entities/coupon.entity';
import { CustomException } from 'src/http-exception/custom-exception';
import { UserModel } from 'src/auth/entities/user.entity';
import { IssuanceCouponResDto } from '../dto/issuance-coupon.res.dto';
import { IssuanceCouponReqDto } from '../dto/issuance-coupon.req.dto';
import { IssuedCouponCreationDto } from '../dto/Issue-coupon-creation.dto';

@Injectable()
export class IssuedCouponService {
  constructor(
    private readonly issuedCouponRepository: IssuedCouponRepository,
    private readonly couponRepository: CouponRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: IssuanceCouponReqDto): Promise<IssuanceCouponResDto> {
    const coupon = await this.findCoupon(dto.coupon);
    const user = await this.findUser(dto.user);

    const creationDto = new IssuedCouponCreationDto();
    creationDto.user = user;
    creationDto.coupon = coupon;
    creationDto.validFrom = dto.validFrom;
    creationDto.validUntil = dto.validUntil;

    return this.issuedCouponRepository.create(creationDto);
  }

  async findCoupon(couponId: string): Promise<CouponModel> {
    const coupon = await this.couponRepository.findOne(couponId);

    if (!coupon) {
      throw new CustomException(
        'coupon',
        '쿠폰이 존재하지 않습니다.',
        '쿠폰이 존재하지 않습니다.',
        HttpStatus.CONFLICT,
      );
    }
    return coupon;
  }

  async findUser(userId: string): Promise<UserModel> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new CustomException(
        'user',
        '유저가 존재하지 않습니다.',
        '유저가 존재하지 않습니다.',
        HttpStatus.CONFLICT,
      );
    }
    return user;
  }
}
