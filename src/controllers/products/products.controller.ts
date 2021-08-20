import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/createProduct.dto';
import { ProductsFilterDto } from 'src/dtos/productsFilter.dto';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  public async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProduct(id);
  }

  @Get()
  public async getProducts(@Query() productsFilter: ProductsFilterDto) {
    return this.productsService.getProducts(productsFilter);
  }

  @Post()
  public async createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  public async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  public async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
