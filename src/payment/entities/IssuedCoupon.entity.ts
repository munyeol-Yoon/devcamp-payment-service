import { UserModel } from 'src/auth/entities/user.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { CouponModel } from './coupon.entity';

@Entity('issued_coupon')
export class IssuedCouponModel extends BaseModel {
  // 쿠폰 유효 여부
  @Column({
    type: 'boolean',
    default: false,
  })
  isValid: boolean;

  // 쿠폰 유효 시작일
  @Column({
    type: 'timestamp',
    default: null,
  })
  validFrom: Date;

  // 쿠폰 유효 만료일
  @Column({
    type: 'timestamp',
    default: null,
  })
  validUntil: Date;

  // 쿠폰 사용 여부
  @Column({
    type: 'boolean',
    default: false,
  })
  isUsed: boolean;

  // 쿠폰 사용 날짜
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  usedAt: Date;

  @ManyToOne(() => UserModel)
  @JoinColumn()
  user: Relation<UserModel>;

  @ManyToOne(() => CouponModel)
  @JoinColumn()
  coupon: Relation<CouponModel>;

  // 주문도 추가해야함
}
