import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

export type ProductStatus = 'available' | 'out-of-stock';

@Entity('product')
export class ProductModel extends BaseModel {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    default: 'available',
  })
  status: ProductStatus;

  // 추후 사용할떄 추가하자
  // category: string;

  // imageUrl: string;
}
