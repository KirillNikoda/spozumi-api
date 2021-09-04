import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Brand } from './brand.entity';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToMany(() => Brand, (brand) => brand.categories)
  brands: Brand[];

  @Column({ unique: true })
  categoryName: string;
}
