import { IsNotEmpty } from 'class-validator';
import { Brand } from 'src/entities/brand.entity';
import { Category } from 'src/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  countryOfOrigin: string;

  @IsNotEmpty()
  brand: Brand;

  @IsNotEmpty()
  category: Category;
}
