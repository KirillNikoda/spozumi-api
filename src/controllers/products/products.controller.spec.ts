import { Test, TestingModule } from '@nestjs/testing';
import { EPIPE } from 'constants';
import { CreateProductDto } from 'src/dtos/createProduct.dto';
import { ProductsService } from 'src/services/products/products.service';
import { ProductsController } from './products.controller';

describe('Test ProductsController', () => {
  let controller: ProductsController;
  let mockedService = {
    getProducts: jest.fn(() => [{ name: 'jacket' }, { name: 'coat' }]),
    getProduct: jest.fn((id: number) => ({ id, name: 'jacket' })),
    deleteProduct: jest.fn((id: number) => ({ id, text: 'success' })),
    updateProduct: jest.fn((id: number, dto: any) => ({ ...dto, id })),
    createProduct: jest.fn((dto: CreateProductDto) => ({
      id: 1,
      name: 'jacket'
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService]
    })
      .overrideProvider(ProductsService)
      .useValue(mockedService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('Should create product and return it', async () => {
    const dto = {
      name: 'jacket'
    } as CreateProductDto;

    const createdProduct = await controller.createProduct(dto);

    expect(createdProduct.name).toEqual('jacket');
    expect(createdProduct.id).toEqual(1);
    expect(mockedService.createProduct).toBeCalled();
    expect(mockedService.createProduct).toBeCalledTimes(1);
  });

  it('Should get all products and return them', async () => {
    const products = await controller.getProducts();

    expect(products).toHaveLength(2);
    expect(products[0].name).toEqual('jacket');
    expect(products[1].name).toEqual('coat');
    expect(mockedService.getProducts).toBeCalled();
    expect(mockedService.getProducts).toBeCalledTimes(1);
  });

  it('Should get one product and return it', async () => {
    const id = 1;

    const product = await controller.getProduct(id);

    expect(product.name).toEqual('jacket');
    expect(product.id).toEqual(id);
    expect(mockedService.getProduct).toBeCalled();
    expect(mockedService.getProduct).toBeCalledTimes(1);
  });

  it('Should delete product by id', async () => {
    const id = 1;

    const result: any = await controller.deleteProduct(id);

    expect(result.text).toEqual('success');
    expect(result.id).toEqual(id);
    expect(mockedService.deleteProduct).toBeCalled();
    expect(mockedService.deleteProduct).toBeCalledTimes(1);
  });

  it('Should update product', async () => {
    const id = 1;

    const dto = {
      name: 'coat'
    };

    const result: any = await controller.updateProduct(id, dto);

    expect(result.name).toEqual('coat');
    expect(result.id).toEqual(id);
    expect(mockedService.updateProduct).toBeCalled();
    expect(mockedService.updateProduct).toBeCalledTimes(1);
  });
});
