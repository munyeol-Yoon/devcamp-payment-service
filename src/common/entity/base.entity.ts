import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
  })
  updatedAt: Date;
}
