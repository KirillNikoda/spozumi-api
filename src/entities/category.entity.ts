import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Brand } from './brand.entity';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Brand, (brand) => brand.categories, { onDelete: 'CASCADE' })
  brand: Brand;

  @Column()
  categoryName: string;
}
