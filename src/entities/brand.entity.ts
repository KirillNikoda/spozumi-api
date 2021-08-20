import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Category, (category) => category.brands)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @Column({ unique: true })
  brandName: string;
}
