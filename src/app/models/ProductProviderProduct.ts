import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import Product from './Product';
import ProductProvider from './ProductProvider';

@Entity('product_provider_product')
export default class ProductProviderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  // eslint-disable-next-line camelcase
  create_at: Date;

  @Column('boolean', { nullable: false })
  active: boolean;

  @ManyToOne(() => Product, product =>
    product.productProviderProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ProductProvider, productProvider =>
    productProvider.productProviderProducts)
  @JoinColumn({ name: 'product_provider_id' })
  productProvider: ProductProvider;
}
