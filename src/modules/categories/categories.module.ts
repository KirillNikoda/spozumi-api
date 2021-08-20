import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from 'src/controllers/categories/categories.controller';
import { Category } from 'src/entities/category.entity';
import { CategoriesService } from 'src/services/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
