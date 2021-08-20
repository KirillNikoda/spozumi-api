import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/controllers/products/products.controller';
import { Brand } from 'src/entities/brand.entity';
import { Category } from 'src/entities/category.entity';
import { ProductsRepository } from 'src/repositories/products.repository';
import { ProductsService } from 'src/services/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository, Brand, Category])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
