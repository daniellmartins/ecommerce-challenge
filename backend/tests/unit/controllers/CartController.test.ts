import { Request, Response } from 'express';
import { CartController } from '../../../src/controllers/CartController';
import { ICartService } from '../../../src/interfaces';
import { Cart } from '../../../src/types';

describe('CartController', () => {
  let cartController: CartController;
  let mockCartService: jest.Mocked<ICartService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let mockCart: Cart;

  beforeEach(() => {
    mockCartService = {
      getCartByUserId: jest.fn(),
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn()
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();

    mockResponse = {
      json: mockJson,
      status: mockStatus
    };

    mockCart = {
      id: 'cart-1',
      userId: 'user-1',
      items: [],
      total: 0,
      subtotal: 0
    };

    cartController = new CartController(mockCartService);
  });

  it('should return cart when userId is provided', async () => {
    mockRequest = { query: { userId: 'user-1' } };
    mockCartService.getCartByUserId.mockReturnValue(mockCart);

    await cartController.getCart(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      data: mockCart
    });
  });

  it('should add product to cart successfully', async () => {
    mockRequest = {
      body: { productId: 'product-1', quantity: 2, userId: 'user-1' }
    };
    mockCartService.addToCart.mockReturnValue(mockCart);

    await cartController.addToCart(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      data: mockCart,
      message: 'Product added to cart successfully'
    });
  });

  it('should return 400 when invalid data is provided', async () => {
    mockRequest = { body: { quantity: 2, userId: 'user-1' } };

    await cartController.addToCart(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
  });

  it('should remove product from cart', async () => {
    mockRequest = {
      params: { id: 'product-1' },
      query: { userId: 'user-1' }
    };
    mockCartService.removeFromCart.mockReturnValue(mockCart);

    await cartController.removeFromCart(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      data: mockCart,
      message: 'Product removed from cart successfully'
    });
  });

  it('should update quantity successfully', async () => {
    mockRequest = {
      body: { productId: 'product-1', quantity: 3, userId: 'user-1' }
    };
    mockCartService.updateQuantity.mockReturnValue(mockCart);

    await cartController.updateQuantity(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      data: mockCart,
      message: 'Quantity updated successfully'
    });
  });
});
