import { Product, UUID } from '../types';

export interface IProductRepository {
  findAll(): Product[];
  findById(id: UUID): Product | undefined;
}