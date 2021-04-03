import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';

import User from './User';

@Entity('product_color')
export default class ProductColor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.productColors)
  @JoinColumn({ name: 'user_id' })
  user:string

  // @OneToMany(() => ProductPurchase, productPurchase => productPurchase.productColor, {
  //   cascade: ['insert', 'update']
  // })
  // @JoinColumn({ name: 'product_provider_id' })
  // productPurchases: string[]
}
