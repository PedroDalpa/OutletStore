import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import Tenant from './Tenant';
import ProductBrand from './ProductBrand';
import Product from './Product';
import ProductProvider from './ProductProvider';
import ProductColor from './ProductColor';
import ProductPurchase from './ProductPurchase';
import ProductCategory from './ProductCategory';
import ProductSubCategory from './ProductSubCategory';

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
  tenant:string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToMany(() => ProductBrand, productBrand => productBrand.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productBrands: string[]

  @OneToMany(() => Product, product => product.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  products: string[]

  @OneToMany(() => ProductProvider, productProvider => productProvider.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productProviders: string[]

  @OneToMany(() => ProductColor, productColor => productColor.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productColors: string[]

  @OneToMany(() => ProductPurchase, productPurchase => productPurchase.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productPurchases: string[]

  @OneToMany(() => ProductCategory, productCategory => productCategory.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productCategorys: string[]

  @OneToMany(() => ProductSubCategory, productSubCategory => productSubCategory.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  productSubCategorys: string[]
}
