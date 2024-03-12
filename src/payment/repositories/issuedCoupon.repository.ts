import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuedCouponModel } from '../entities/IssuedCoupon.entity';

@Injectable()
export class IssuedCouponRepository {
  constructor(
    @InjectRepository(IssuedCouponModel)
    private readonly repository: Repository<IssuedCouponModel>,
  ) {}
}
