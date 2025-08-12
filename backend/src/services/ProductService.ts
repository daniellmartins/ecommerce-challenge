import { Product, UUID } from '../types';
import { IProductService, IProductRepository } from '../interfaces';

export class ProductService implements IProductService {
  constructor(private productRepository: IProductRepository) {}

  getAllProducts(): Product[] {
    return this.productRepository.findAll();
  }

  getProductById(id: UUID): Product | undefined {
    return this.productRepository.findById(id);
  }
}
