import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import Product from './Product';

@Entity('product_stock')
export default class ProductStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @OneToOne(type => Product)
  @JoinColumn({ name: 'product_id' })
  productsId: string;
}
