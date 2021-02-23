import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import ProductSubCategory from './ProductSubCategory';

import User from './User';

@Entity('product_category')
export default class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.productCategorys)
  @JoinColumn({ name: 'user_id' })
  user:string

  @OneToMany(() => ProductSubCategory, productSubCategory => productSubCategory.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productSubCategorys: string[]
}
