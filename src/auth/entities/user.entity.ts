import { BaseEntity, Column, Entity } from 'typeorm';

export enum Role {
  admin = 'Admin',
  user = 'User,',
}

@Entity()
export class User extends BaseEntity {
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
}
