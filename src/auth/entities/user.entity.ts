import { Exclude } from 'class-transformer';
import { BaseModel } from 'src/common/entity/base.entity';
import { CouponModel } from 'src/payment/entities/coupon.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

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

  @OneToMany(() => UserModel, (user) => user.id)
  coupon: Relation<CouponModel[]>;
}
