import { ProductRepository } from '../../../src/repositories/ProductRepository';
import { mockProducts } from '../../../src/data/products';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
  });

  it('should return all products', () => {
    const products = productRepository.findAll();
    expect(products).toHaveLength(mockProducts.length);
    expect(products).toEqual(mockProducts);
  });

  it('should return product when ID exists', () => {
    const existingId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    const product = productRepository.findById(existingId);
    expect(product).toBeDefined();
    expect(product?.id).toBe(existingId);
  });

  it('should return undefined when ID does not exist', () => {
    const product = productRepository.findById('non-existent-id');
    expect(product).toBeUndefined();
  });

  it('should return new array instance each time', () => {
    const products1 = productRepository.findAll();
    const products2 = productRepository.findAll();
    expect(products1).not.toBe(products2);
    expect(products1).toEqual(products2);
  });
});
