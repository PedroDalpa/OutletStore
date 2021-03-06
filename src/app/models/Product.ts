import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import ProductBrand from './ProductBrand';
import ProductProviderProduct from './ProductProviderProduct';
import ProductPurchase from './ProductPurchase';
import ProductSubCategory from './ProductSubCategory';

import User from './User';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: 'user_id' })
  user:string

  @ManyToOne(() => ProductBrand, productBrand => productBrand.products)
  @JoinColumn({ name: 'product_brand_id' })
  productBrand:string

  @ManyToOne(() => ProductSubCategory, productSubCategory => productSubCategory.products)
  @JoinColumn({ name: 'product_brand_id' })
  productSubCategory:string

  @OneToMany(() => ProductProviderProduct, productProviderProduct =>
    productProviderProduct.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  productProviderProducts: string[]

  @OneToMany(() => ProductPurchase, productPurchase =>
    productPurchase.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  productPurchases: string[]
}
