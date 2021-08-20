import { Brand } from 'src/entities/brand.entity';

export class CreateCategoryDto {
  categoryName: string;
  brands: Brand[];
}
