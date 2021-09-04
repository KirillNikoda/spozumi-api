import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  countryOfOrigin: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL'
  })
  category: Category;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Product[];

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'SET NULL' })
  brand: Brand;
}
