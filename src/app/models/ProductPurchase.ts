/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import Product from './Product';
import ProductProvider from './ProductProvider';
import Purchase from './Purchase';

@Entity('product_purchase')
export default class ProductPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @Column('float', { nullable: false })
  amount: number;

  @Column('float', { nullable: false, name: 'total_value' })
  totalValue: number;

  @Column('float', { nullable: false, name: 'unit_value' })
  unitValue: number;

  @ManyToOne(() => ProductProvider, productProvider => productProvider.productPurchases)
  @JoinColumn({ name: 'product_provider_id' })
  productProvider:string

  @ManyToOne(() => Product, product => product.productPurchases)
  @JoinColumn({ name: 'product_id' })
  product:string

  @ManyToOne(() => Purchase, purchase => purchase.productsPurchase)
  @JoinColumn({ name: 'purchase_id' })
  purchase:string
}
