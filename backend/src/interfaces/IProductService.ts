import { Product, UUID } from '../types';

export interface IProductService {
  getAllProducts(): Product[];
  getProductById(id: UUID): Product | undefined;
}
