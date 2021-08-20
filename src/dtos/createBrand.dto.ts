import { Category } from 'src/entities/category.entity';

export class CreateBrandDto {
  brandName: string;
  categories: Category[];
}
