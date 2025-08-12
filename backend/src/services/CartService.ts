import { Cart, CartItem } from '../types';
import { ICartService, ICartRepository, IProductService, IUserService } from '../interfaces';

export class CartService implements ICartService {
  constructor(
    private cartRepository: ICartRepository,
    private productService: IProductService,
    private userService: IUserService
  ) {}

  getCartByUserId(userId: string): Cart | undefined {
    const validUserId = this.userService.ensureUserExists(userId);
    let cart = this.cartRepository.findByUserId(validUserId);
    
    if (!cart) {
      cart = this.cartRepository.create(validUserId);
    }
    
    return cart;
  }

  addToCart(userId: string, productId: string, quantity: number): Cart | null {
    const validUserId = this.userService.ensureUserExists(userId);
    const product = this.productService.getProductById(productId);
    
    if (!product) return null;

    const cartItem: CartItem = {
      productId,
      quantity,
      product
    };

    return this.cartRepository.addItem(validUserId, cartItem);
  }

  removeFromCart(userId: string, productId: string): Cart | null {
    return this.cartRepository.removeItem(userId, productId);
  }

  updateQuantity(userId: string, productId: string, quantity: number): Cart | null {
    return this.cartRepository.updateItemQuantity(userId, productId, quantity);
  }

  clearCart(userId: string): Cart | null {
    return this.cartRepository.clear(userId);
  }
}
