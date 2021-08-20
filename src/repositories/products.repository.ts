import { ProductsFilterDto } from 'src/dtos/productsFilter.dto';
import { Product } from 'src/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public async getProducts(filterDto: ProductsFilterDto): Promise<Product[]> {
    console.log(filterDto);

    const { category, brand, color, price } = filterDto;
    const query = this.createQueryBuilder('product');

    await query
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand');

    if (category) {
      console.log('hello world');

      query.andWhere('category.categoryName = :category', { category });
    }

    if (brand) {
      query.andWhere('product.brandName = :brand', { brand });
    }

    if (color) {
      query.andWhere('product.color = :color', { color });
    }

    if (price) {
      query.andWhere('product.price = :price', { price });
    }

    const products = await query.getMany();

    return products;
  }
}
