import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from 'src/controllers/brand/brands.controller';
import { Brand } from 'src/entities/brand.entity';
import { Category } from 'src/entities/category.entity';
import { BrandService } from 'src/services/brands/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Category])],
  providers: [BrandService],
  controllers: [BrandsController]
})
export class BrandsModule {}
