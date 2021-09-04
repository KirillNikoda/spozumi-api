import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

export class CreateOrderDto {
  @IsNotEmptyObject()
  products: Product[];

  @IsNotEmptyObject()
  user: User;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  deliveryDate: string;
}
