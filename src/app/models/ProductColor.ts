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

  @ManyToOne(() => User, tenant => tenant.productColors)
  @JoinColumn({ name: 'user_id' })
  user:User

  // @OneToMany(() => Product, product => product.productBrand, {
  //   cascade: ['insert', 'update']
  // })
  // @JoinColumn({ name: 'product_brand_id' })
  // products: Product[]
}
