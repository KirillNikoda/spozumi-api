import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateBrandDto } from 'src/dtos/createBrand.dto';
import { BrandService } from 'src/services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandService) {}

  @Get()
  public async getBrands() {
    return this.brandsService.getBrands();
  }

  @Post()
  public async createBrand(@Body() brand: CreateBrandDto) {
    return this.brandsService.createBrand(brand);
  }

  @Delete()
  public async deleteBrand() {}
}
