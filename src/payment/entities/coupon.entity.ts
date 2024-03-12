import { BaseModel } from 'src/common/entity/base.entity';
import { CouponType } from 'src/common/types/types';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { IssuedCouponModel } from './IssuedCoupon.entity';

@Entity('coupon')
export class CouponModel extends BaseModel {
  @Column({
    type: 'varchar',
  })
  type: CouponType;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  value: number; // 얼마나 할인 되는지

  @OneToMany(() => IssuedCouponModel, (issuedCoupon) => issuedCoupon.coupon)
  issuedCoupons: Relation<IssuedCouponModel[]>;
}
