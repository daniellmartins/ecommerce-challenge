import { Product } from '../types';
import { IProductRepository } from '../interfaces';
import { mockProducts } from '../data/products';

export class ProductRepository implements IProductRepository {
  private products: Product[] = mockProducts;

  findAll(): Product[] {
    return [...this.products];
  }

  findById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
