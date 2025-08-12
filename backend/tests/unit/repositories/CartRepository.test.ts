import { CartRepository } from '../../../src/repositories/CartRepository';
import { CartItem, Product } from '../../../src/types';

describe('CartRepository', () => {
  let cartRepository: CartRepository;
  let mockProduct: Product;
  let mockCartItem: CartItem;

  beforeEach(() => {
    cartRepository = new CartRepository();
    
    mockProduct = {
      id: 'product-1',
      name: 'Test Product',
      price: 100.00,
      description: 'Test product description',
      image: 'https://example.com/image.jpg',
      category: 'Test',
      inStock: true
    };

    mockCartItem = {
      productId: 'product-1',
      quantity: 2,
      product: mockProduct
    };
  });

  it('should create empty cart for user', () => {
    const userId = 'user-1';
    const cart = cartRepository.create(userId);
    
    expect(cart.userId).toBe(userId);
    expect(cart.items).toEqual([]);
    expect(cart.total).toBe(0);
  });

  it('should add item to cart', () => {
    const userId = 'user-1';
    const cart = cartRepository.addItem(userId, mockCartItem);
    
    expect(cart?.items).toHaveLength(1);
    expect(cart?.total).toBe(200);
  });

  it('should remove item from cart', () => {
    const userId = 'user-1';
    cartRepository.addItem(userId, mockCartItem);
    const cart = cartRepository.removeItem(userId, 'product-1');
    
    expect(cart?.items).toHaveLength(0);
    expect(cart?.total).toBe(0);
  });

  it('should update item quantity', () => {
    const userId = 'user-1';
    cartRepository.addItem(userId, mockCartItem);
    const cart = cartRepository.updateItemQuantity(userId, 'product-1', 5);
    
    expect(cart?.items[0].quantity).toBe(5);
    expect(cart?.total).toBe(500);
  });

  it('should clear all items from cart', () => {
    const userId = 'user-1';
    cartRepository.addItem(userId, mockCartItem);
    const cart = cartRepository.clear(userId);
    
    expect(cart?.items).toHaveLength(0);
    expect(cart?.total).toBe(0);
  });
});
