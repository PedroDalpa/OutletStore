/* eslint-disable camelcase */
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import Product from './Product';
import ProductInputStock from './ProductInputStock';

@Entity('product_stock')
export default class ProductStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @Column('boolean', { nullable: false, default: 1 })
  is_stock: boolean;

  @OneToOne(type => Product)
  @JoinColumn({ name: 'product_id' })
  productsId: string;

  @ManyToOne(() => ProductInputStock, productStock => productStock.productsStock)
  @JoinColumn({ name: 'product_bar_code' })
  productInputStock:string
}
