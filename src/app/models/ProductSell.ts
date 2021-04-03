/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import ProductInputStock from './ProductInputStock';
import ProductOutputStock from './ProductOutputStock';

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
  value: number;

  @ManyToOne(() => Sell, sell => sell.productsSell)
  @JoinColumn({ name: 'sell_id' })
  sell:string

  @ManyToOne(() => ProductInputStock, productSell => productSell.productsSell)
  @JoinColumn({ name: 'product_bar_code' })
  barCode:string

  @OneToMany(() => ProductOutputStock, productOutputStock => productOutputStock.productSellId, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_sell_id' })
  productOutput: string[]
}
