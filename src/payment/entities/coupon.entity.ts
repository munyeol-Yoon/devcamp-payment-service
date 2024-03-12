import { BaseModel } from 'src/common/entity/base.entity';
import { CouponType } from 'src/common/types/types';
import { Column, Entity } from 'typeorm';

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
}
