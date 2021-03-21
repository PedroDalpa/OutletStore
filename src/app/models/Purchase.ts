/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import ProductPurchase from './ProductPurchase';

import User from './User';

@Entity('purchase')
export default class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  fiscal_note: string;

  @Column('float', { nullable: false })
  total_value: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user:string

  @OneToMany(() => ProductPurchase, productPurchase =>
    productPurchase.purchase, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'purchase_id' })
  productsPurchase: ProductPurchase[];
}
