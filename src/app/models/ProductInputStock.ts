/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, JoinColumn, OneToOne, BeforeInsert, ManyToOne, OneToMany
} from 'typeorm';
import ProductPurchase from './ProductPurchase';

import crypto from 'crypto';
import Product from './Product';
import ProductStock from './ProductStock';

@Entity('product_input_stock')
export default class ProductInputStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @Column('varchar', { nullable: false })
  product_bar_code: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.product_bar_code = crypto.randomBytes(6).toString('hex');
  }

  @OneToOne(type => ProductPurchase)
  @JoinColumn({ name: 'product_purchase_id' })
  productsPurchaseId: string;

  @ManyToOne(() => Product, product => product.productInputStocks)
  @JoinColumn({ name: 'product_id' })
  product:string

  @OneToMany(() => ProductStock, productStock => productStock.productInputStock, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_bar_code' })
  productsStock: string[]
}
