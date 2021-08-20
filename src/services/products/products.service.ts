import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/createProduct.dto';
import { ProductsFilterDto } from 'src/dtos/productsFilter.dto';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';
import { Brand } from 'src/entities/brand.entity';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { ProductsRepository } from 'src/repositories/products.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productRepository: ProductsRepository,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>
  ) {}

  public async getProducts(filterDto: ProductsFilterDto): Promise<Product[]> {
    try {
      return await this.productRepository.getProducts(filterDto);
    } catch (e) {
      throw new InternalServerErrorException(
        'Error while querying all products'
      );
    }
  }

  public async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['category', 'brand']
    });

    if (!product) {
      throw new NotFoundException('Product with that id was not found');
    }

    return product;
  }

  public async createProduct(product: CreateProductDto): Promise<Product> {
    const productExists = await this.productRepository.findOne({
      name: product.name
    });

    if (productExists) {
      throw new BadRequestException('Product with that name already exists');
    }

    const [brand, category] = await Promise.all([
      this.brandRepository.findOne({
        brandName: String(product.brand)
      }),
      this.categoryRepository.findOne({
        categoryName: String(product.category)
      })
    ]);

    product.category = category;
    product.brand = brand;

    const createdProduct = await this.productRepository.save(product);

    return createdProduct;
  }

  public async deleteProduct(id: number): Promise<DeleteResult> {
    try {
      return await this.productRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(
        'Error while deleting product by id'
      );
    }
  }

  public async updateProduct(
    id: number,
    product: UpdateProductDto
  ): Promise<UpdateResult> {
    const productExists = await this.productRepository.findOne(id);
    if (!productExists) {
      throw new NotFoundException('Product with that id does not exist');
    }
    const updatedProduct = await this.productRepository.update(id, product);

    return updatedProduct;
  }
}
