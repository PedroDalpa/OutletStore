/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, JoinColumn, OneToOne, BeforeInsert, ManyToOne, OneToMany
} from 'typeorm';
import ProductPurchase from './ProductPurchase';

import crypto from 'crypto';
import Product from './Product';
import ProductStock from './ProductStock';
import ProductSell from './ProductSell';

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
    this.product_bar_code = crypto.randomBytes(3).toString('hex');
  }

  @OneToOne(type => ProductPurchase)
  @JoinColumn({ name: 'product_purchase_id' })
  productsPurchaseId: string;

  @ManyToOne(() => Product, product => product.productInputStocks)
  @JoinColumn({ name: 'product_id' })
  product:Product

  @OneToMany(() => ProductStock, productStock => productStock.barCode, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_bar_code' })
  productsStock: string[]

  @OneToMany(() => ProductSell, productSell => productSell.barCode, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_bar_code' })
  productsSell: string[]
}
