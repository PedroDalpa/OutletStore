import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import User from './User';

@Entity('tenant')
export default class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column('varchar', { nullable: true })
  name:string;

  @Column('varchar', { nullable: true })
  phone:string;

  @Column('varchar', { nullable: true })
  street:string;

  @Column('varchar', { nullable: true })
  city:string;

  @Column('varchar', { nullable: true })
  state:string;

  @Column('varchar', { nullable: true })
  zip:string;

  @Column('varchar', { nullable: true })
  email:string;

  @Column('boolean', { nullable: false, default: 1 })
  active: boolean;

  @OneToMany(() => User, user => user.tenant, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'tenant_id' })
  users: string[]
}
