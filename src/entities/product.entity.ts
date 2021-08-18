import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'SET NULL' })
  brand: Brand;
}
