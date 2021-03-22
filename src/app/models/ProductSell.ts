/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import Product from './Product';
import Sell from './Sell';

@Entity('product_sell')
export default class ProductSell {
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

  @ManyToOne(() => Product, product => product.productSells)
  @JoinColumn({ name: 'product_id' })
  product:string

  @ManyToOne(() => Sell, sell => sell.productsSell)
  @JoinColumn({ name: 'sell_id' })
  sell:string
}
