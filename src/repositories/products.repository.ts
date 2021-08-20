import { ProductsFilterDto } from 'src/dtos/productsFilter.dto';
import { Product } from 'src/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public async getProducts(filterDto: ProductsFilterDto): Promise<Product[]> {
    const { category, brand, color, price } = filterDto;
    const query = this.createQueryBuilder('product');

    await query
      .leftJoin('product.category', 'category')
      .leftJoin('product.brand', 'brand');

    if (category) {
      query.andWhere('product.category.categoryName = :category', { category });
    }

    if (brand) {
      query.andWhere('product.brand.brandName = :brand', { brand });
    }

    if (color) {
      query.andWhere('product.color = :color', { color });
    }

    if (price) {
      query.andWhere('product.color = :color', { color });
    }

    const products = await query.getMany();

    console.log(products);

    return products;
  }
}
