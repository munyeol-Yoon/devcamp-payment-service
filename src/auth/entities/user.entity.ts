import { Exclude } from 'class-transformer';
import { BaseModel } from 'src/common/entity/base.entity';
import { IssuedCouponModel } from 'src/payment/entities/IssuedCoupon.entity';
import { PointModel } from 'src/payment/entities/point.entity';
import { Column, Entity, OneToMany, OneToOne, Relation } from 'typeorm';

export enum Role {
  admin = 'admin',
  user = 'user',
}

@Entity('user')
export class UserModel extends BaseModel {
  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  address: string;

  @Column({
    type: 'varchar',
    default: Role.user,
  })
  role: Role;

  @OneToMany(() => IssuedCouponModel, (issuedCoupon) => issuedCoupon.user)
  issuedCoupons: Relation<IssuedCouponModel[]>;

  @OneToOne(() => PointModel, (point) => point.user)
  point: Relation<PointModel>;
}
