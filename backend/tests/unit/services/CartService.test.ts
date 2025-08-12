import { CartService } from '../../../src/services/CartService';
import { ICartRepository, IProductService, IUserService } from '../../../src/interfaces';
import { Cart, Product } from '../../../src/types';

describe('CartService', () => {
  let cartService: CartService;
  let mockCartRepository: jest.Mocked<ICartRepository>;
  let mockProductService: jest.Mocked<IProductService>;
  let mockUserService: jest.Mocked<IUserService>;
  let mockProduct: Product;
  let mockCart: Cart;

  beforeEach(() => {
    mockProduct = {
      id: 'product-1',
      name: 'Test Product',
      price: 100.00,
      description: 'Test product description',
      image: 'https://example.com/image.jpg',
      category: 'Test Category',
      inStock: true
    };

    mockCart = {
      id: 'cart-1',
      userId: 'user-1',
      items: [],
      total: 0,
      subtotal: 0
    };

    mockCartRepository = {
      findByUserId: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateItemQuantity: jest.fn(),
      clear: jest.fn()
    };

    mockProductService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn()
    };

    mockUserService = {
      generateUserId: jest.fn(),
      validateUserId: jest.fn(),
      ensureUserExists: jest.fn()
    };

    cartService = new CartService(mockCartRepository, mockProductService, mockUserService);
  });

  it('should return existing cart for valid user', () => {
    mockUserService.ensureUserExists.mockReturnValue('user-1');
    mockCartRepository.findByUserId.mockReturnValue(mockCart);
    
    const result = cartService.getCartByUserId('user-1');
    expect(result).toEqual(mockCart);
  });

  it('should add item to cart successfully', () => {
    mockUserService.ensureUserExists.mockReturnValue('user-1');
    mockProductService.getProductById.mockReturnValue(mockProduct);
    mockCartRepository.addItem.mockReturnValue(mockCart);
    
    const result = cartService.addToCart('user-1', 'product-1', 2);
    expect(result).toEqual(mockCart);
  });

  it('should return null when product does not exist', () => {
    mockUserService.ensureUserExists.mockReturnValue('user-1');
    mockProductService.getProductById.mockReturnValue(undefined);
    
    const result = cartService.addToCart('user-1', 'non-existent', 1);
    expect(result).toBeNull();
  });

  it('should remove item from cart', () => {
    mockCartRepository.removeItem.mockReturnValue(mockCart);
    
    const result = cartService.removeFromCart('user-1', 'product-1');
    expect(result).toEqual(mockCart);
  });

  it('should clear cart successfully', () => {
    const clearedCart = { ...mockCart, items: [] };
    mockCartRepository.clear.mockReturnValue(clearedCart);
    
    const result = cartService.clearCart('user-1');
    expect(result).toEqual(clearedCart);
  });
});
