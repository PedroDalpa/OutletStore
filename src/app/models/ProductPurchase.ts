import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import Product from './Product';
import ProductColor from './ProductColor';
import ProductProvider from './ProductProvider';

import User from './User';

@Entity('product_purchase')
export default class ProductPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @Column('varchar', { nullable: false })
  // eslint-disable-next-line camelcase
  product_size: string;

  @Column('float', { nullable: false })
  // eslint-disable-next-line camelcase
  amount: number;

  @Column('float', { nullable: false })
  // eslint-disable-next-line camelcase
  total_value: number;

  @Column('float', { nullable: false })
  // eslint-disable-next-line camelcase
  unit_value: number;

  @Column('varchar', { nullable: false })
  // eslint-disable-next-line camelcase
  fiscal_note_number: string;

  @ManyToOne(() => User, user => user.productPurchases)
  @JoinColumn({ name: 'user_id' })
  user:string

  @ManyToOne(() => ProductProvider, productProvider => productProvider.productPurchases)
  @JoinColumn({ name: 'product_provider_id' })
  productProvider:string

  @ManyToOne(() => ProductColor, productColor => productColor.productPurchases)
  @JoinColumn({ name: 'product_color_id' })
  productColor:string

  @ManyToOne(() => Product, product => product.productPurchases)
  @JoinColumn({ name: 'product_id' })
  product:string
}
