/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, JoinColumn, OneToOne
} from 'typeorm';
import ProductPurchase from './ProductPurchase';

@Entity('product_input_stock')
export default class ProductInputStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @OneToOne(type => ProductPurchase)
  @JoinColumn({ name: 'product_purchase_id' })
  productsPurchaseId: string;
}
