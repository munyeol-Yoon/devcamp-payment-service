import { UserModel } from 'src/auth/entities/user.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

@Entity('point')
export class PointModel extends BaseModel {
  @Column({
    type: 'int',
  })
  availableAmount: number;

  @OneToOne(() => UserModel, (user) => user.point)
  @JoinColumn()
  user: Relation<UserModel>;
}
