import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Category, (category) => category.brand)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @Column()
  brandName: string;
}
