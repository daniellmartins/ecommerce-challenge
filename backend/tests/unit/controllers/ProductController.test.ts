import { Request, Response } from 'express';
import { ProductController } from '../../../src/controllers/ProductController';
import { IProductService } from '../../../src/interfaces';
import { Product } from '../../../src/types';

describe('ProductController', () => {
  let productController: ProductController;
  let mockProductService: jest.Mocked<IProductService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockProductService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn()
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();

    mockResponse = {
      json: mockJson,
      status: mockStatus
    };

    mockRequest = {};

    productController = new ProductController(mockProductService);
  });

  it('should return all products successfully', async () => {
    const mockProducts: Product[] = [{
      id: 'product-1',
      name: 'Test Product',
      price: 100.00,
      description: 'Test description',
      image: 'https://example.com/product1.jpg',
      category: 'Test Category',
      inStock: true
    }];

    mockProductService.getAllProducts.mockReturnValue(mockProducts);
    await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      data: mockProducts
    });
  });

  it('should return product when found', async () => {
    const mockProduct: Product = {
      id: 'product-1',
      name: 'Found Product',
      price: 150.00,
      description: 'Found product description',
      image: 'https://example.com/found-product.jpg',
      category: 'Found Category',
      inStock: true
    };

    mockRequest.params = { id: 'product-1' };
    mockProductService.getProductById.mockReturnValue(mockProduct);

    await productController.getProductById(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      data: mockProduct
    });
  });

  it('should return 404 when product not found', async () => {
    mockRequest.params = { id: 'non-existent' };
    mockProductService.getProductById.mockReturnValue(undefined);

    await productController.getProductById(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({
      success: false,
      error: 'Product not found'
    });
  });

  it('should return 500 on service error', async () => {
    mockProductService.getAllProducts.mockImplementation(() => {
      throw new Error('Service error');
    });

    await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
  });
});
