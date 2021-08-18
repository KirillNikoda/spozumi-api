import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  public async getProduct(@Param('id', ParseIntPipe) id: number) {}
}
