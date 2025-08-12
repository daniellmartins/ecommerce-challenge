import { Request, Response } from 'express';
import { IProductService } from '../interfaces';
import { ApiResponse, Product } from '../types';

export class ProductController {
  constructor(private productService: IProductService) {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = this.productService.getAllProducts();
      
      const response: ApiResponse<Product[]> = {
        success: true,
        data: products
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      res.status(500).json(response);
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = this.productService.getProductById(id);

      if (!product) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Product not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Product> = {
        success: true,
        data: product
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      res.status(500).json(response);
    }
  }
}
