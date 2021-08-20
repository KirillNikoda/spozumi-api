import { Brand } from 'src/entities/brand.entity';
import { Category } from 'src/entities/category.entity';

export class UpdateProductDto {
  price?: number;

  name?: string;

  size?: string;

  countryOfOrigin?: string;

  brand?: Brand;

  category?: Category;
}
