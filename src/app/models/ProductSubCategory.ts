import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import ProductCategory from './ProductCategory';

import User from './User';

@Entity('product_sub_category')
export default class ProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.productSubCategorys)
  @JoinColumn({ name: 'user_id' })
  user:string

  @ManyToOne(() => ProductCategory, productCategory => productCategory.productSubCategorys)
  @JoinColumn({ name: 'product_category_id' })
  productCategory:string
}
