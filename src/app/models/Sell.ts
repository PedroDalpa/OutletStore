/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import ProductSell from './ProductSell';

import User from './User';

@Entity('sell')
export default class Sell {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { nullable: false })
  total_value: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.sells)
  @JoinColumn({ name: 'user_id' })
  user:string

  @OneToMany(() => ProductSell, productSell =>
    productSell.sell, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'sell_id' })
  productsSell: ProductSell[];
}
