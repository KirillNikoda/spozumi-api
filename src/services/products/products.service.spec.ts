import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/createProduct.dto';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';
import { Brand } from 'src/entities/brand.entity';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { ProductsService } from './products.service';

describe('Test ProductsService', () => {
  let service: ProductsService;
  let mockedProductRepository = {
    findOne: jest.fn((id: number) =>
      typeof id === 'number' ? { id, name: 'jacket' } : null
    ),
    find: jest.fn(() => [
      { id: 1, name: 'jacket' },
      { id: 2, name: 'coat' }
    ]),
    update: jest.fn((id: number, dto: UpdateProductDto) => ({ id, ...dto })),
    save: jest.fn((dto: CreateProductDto) => ({ id: 1, ...dto })),
    delete: jest.fn((id: number) => ({ id, success: true }))
  };

  let mockedCategoryRepository = {
    findOne: jest.fn(() => new Category())
  };

  let mockedBrandRepository = {
    findOne: jest.fn(() => new Brand())
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockedProductRepository
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockedCategoryRepository
        },
        {
          provide: getRepositoryToken(Brand),
          useValue: mockedBrandRepository
        }
      ]
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('Should get product by id and return it', async () => {
    const id = 1;
    const product = await service.getProduct(id);

    expect(product.id).toEqual(id);
    expect(product.name).toEqual('jacket');
    expect(mockedProductRepository.findOne).toBeCalled();
    expect(mockedProductRepository.findOne).toBeCalledTimes(1);
  });

  it('Should get all products and return them', async () => {
    const products = await service.getProducts();

    expect(products).toHaveLength(2);
    expect(products[0].name).toEqual('jacket');
    expect(mockedProductRepository.find).toBeCalled();
    expect(mockedProductRepository.find).toBeCalledTimes(1);
  });

  it('Should delete product by id', async () => {
    const id = 1;

    const result: any = await service.deleteProduct(id);

    expect(result.success).toBeTruthy();
    expect(result.id).toEqual(id);
    expect(mockedProductRepository.delete).toBeCalled();
    expect(mockedProductRepository.delete).toBeCalledTimes(1);
  });

  it('Should update product by id', async () => {
    const id = 1;
    const dto = {
      name: 'coat'
    } as UpdateProductDto;

    const result: any = await service.updateProduct(id, dto);

    expect(result.id).toEqual(id);
    expect(result.name).toEqual(dto.name);
    expect(mockedProductRepository.update).toBeCalled();
    expect(mockedProductRepository.update).toBeCalledTimes(1);
  });

  it('Should create product', async () => {
    const dto = {
      name: 'coat'
    } as CreateProductDto;

    const createdProduct = await service.createProduct(dto);

    expect(createdProduct.name).toEqual(dto.name);
    expect(createdProduct.id).toEqual(1);
    expect(mockedProductRepository.save).toBeCalled();
    expect(mockedProductRepository.save).toBeCalledTimes(1);
    expect(mockedCategoryRepository.findOne).toBeCalled();
    expect(mockedCategoryRepository.findOne).toBeCalledTimes(1);
    expect(mockedBrandRepository.findOne).toBeCalled();
    expect(mockedBrandRepository.findOne).toBeCalledTimes(1);
  });
});
