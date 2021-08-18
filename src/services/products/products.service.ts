import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/createProduct.dto';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';
import { Product } from 'src/entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

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
