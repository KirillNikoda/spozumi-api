import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  address: string;

  @Column()
  deliveryDate: string;
}
