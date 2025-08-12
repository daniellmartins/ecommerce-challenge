import { 
  IProductRepository, 
  ICartRepository, 
  IUserRepository, 
  IProductService, 
  ICartService,
  IUserService 
} from '../interfaces';

import { ProductRepository, CartRepository, UserRepository } from '../repositories';
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartService';
import { UserService } from '../services/UserService';

export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerDependencies();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerDependencies(): void {
    this.services.set('IUserRepository', new UserRepository());
    this.services.set('IProductRepository', new ProductRepository());
    this.services.set('ICartRepository', new CartRepository());

    this.services.set('IUserService', new UserService(
      this.get<IUserRepository>('IUserRepository')
    ));

    this.services.set('IProductService', new ProductService(
      this.get<IProductRepository>('IProductRepository')
    ));

    this.services.set('ICartService', new CartService(
      this.get<ICartRepository>('ICartRepository'),
      this.get<IProductService>('IProductService'),
      this.get<IUserService>('IUserService')
    ));
  }

  public get<T>(token: string): T {
    const service = this.services.get(token);
    if (!service) {
      throw new Error(`Service ${token} not found in container`);
    }
    return service;
  }
}
