import { ProductService } from '../../../src/services/ProductService';
import { IProductRepository } from '../../../src/interfaces';
import { Product } from '../../../src/types';

describe('ProductService', () => {
  let productService: ProductService;
  let mockProductRepository: jest.Mocked<IProductRepository>;
  let mockProducts: Product[];

  beforeEach(() => {
    mockProducts = [
      {
        id: 'product-1',
        name: 'Product 1',
        price: 100.00,
        description: 'Product 1 description',
        image: 'https://example.com/product1.jpg',
        category: 'Category 1',
        inStock: true
      }
    ];

    mockProductRepository = {
      findAll: jest.fn(),
      findById: jest.fn()
    };

    productService = new ProductService(mockProductRepository);
  });

  it('should return all products from repository', () => {
    mockProductRepository.findAll.mockReturnValue(mockProducts);
    const result = productService.getAllProducts();
    expect(result).toEqual(mockProducts);
  });

  it('should return product when ID exists', () => {
    const expectedProduct = mockProducts[0];
    mockProductRepository.findById.mockReturnValue(expectedProduct);
    const result = productService.getProductById('product-1');
    expect(result).toEqual(expectedProduct);
  });

  it('should return undefined when ID does not exist', () => {
    mockProductRepository.findById.mockReturnValue(undefined);
    const result = productService.getProductById('non-existent');
    expect(result).toBeUndefined();
  });
});
