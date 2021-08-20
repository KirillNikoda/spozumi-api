import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/createCategory.dto';
import { CategoriesService } from 'src/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  public async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  public async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Delete()
  public async deleteCategory() {}
}
