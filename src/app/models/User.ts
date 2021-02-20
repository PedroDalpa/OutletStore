import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import Tenant from './Tenant';
import ProductBrand from './ProductBrand';
import Product from './Product';
import ProductProvider from './ProductProvider';
import ProductColor from './ProductColor';
import ProductPurchase from './ProductPurchase';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('int', { nullable: false })
  // eslint-disable-next-line camelcase
  access_level: number;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @Column('varchar', { nullable: false })
  phone: string;

  @ManyToOne(() => Tenant, tenant => tenant.users)
  @JoinColumn({ name: 'tenant_id' })
  tenant:Tenant

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToMany(() => ProductBrand, productBrand => productBrand.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productBrands: ProductBrand[]

  @OneToMany(() => Product, product => product.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  products: Product[]

  @OneToMany(() => ProductProvider, productProvider => productProvider.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productProviders: ProductProvider[]

  @OneToMany(() => ProductColor, productColor => productColor.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productColors: ProductColor[]

  @OneToMany(() => ProductPurchase, productPurchase => productPurchase.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productPurchases: ProductPurchase[]
}
