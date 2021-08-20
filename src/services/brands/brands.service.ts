import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto } from 'src/dtos/createBrand.dto';
import { Brand } from 'src/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>
  ) {}

  public async createBrand(brand: CreateBrandDto): Promise<Brand> {
    return await this.brandRepository.save(brand);
  }

  public async getBrands(): Promise<Brand[]> {
    return await this.brandRepository.find({
      relations: ['categories', 'products']
    });
  }
}
