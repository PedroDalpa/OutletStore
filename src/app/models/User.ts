import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import Tenant from './Tenant';
import ProductBrand from './ProductBrand';

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
}
