import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import Product from './Product';

import User from './User';

@Entity('product_brand')
export default class ProductBrand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.productBrands)
  @JoinColumn({ name: 'user_id' })
  user:string

  @OneToMany(() => Product, product => product.productBrand, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_brand_id' })
  products: string[]
}
