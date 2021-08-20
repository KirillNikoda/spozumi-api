import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dtos/createCategory.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  public async createCategory(category: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.save(category);
  }

  public async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: ['brands', 'products']
    });
  }
}
