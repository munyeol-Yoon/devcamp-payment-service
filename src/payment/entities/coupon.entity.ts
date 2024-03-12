import { BaseEntity, Column } from 'typeorm';

export enum CouponType {
  percent = 'percent', // 정률제
  fixed = 'fixed', // 정액제
}

export class CouponModel extends BaseEntity {
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
