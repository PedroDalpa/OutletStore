import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import ProductProviderProduct from './ProductProviderProduct';
import ProductPurchase from './ProductPurchase';

import User from './User';

@Entity('product_provider')
export default class ProductProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  phone: string;

  @Column('varchar', { nullable: false })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.productProviders)
  @JoinColumn({ name: 'user_id' })
  user:User

  @OneToMany(() => ProductProviderProduct, productProviderProduct =>
    productProviderProduct.productProvider, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_provider_id' })
  productProviderProducts: ProductProviderProduct[]

  @OneToMany(() => ProductPurchase, productPurchase => productPurchase.productProvider, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_provider_id' })
  productPurchases: ProductPurchase[]
}
