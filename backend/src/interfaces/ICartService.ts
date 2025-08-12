import { Cart, UUID } from '../types';

export interface ICartService {
  getCartByUserId(userId: UUID): Cart | undefined;
  addToCart(userId: UUID, productId: UUID, quantity: number): Cart | null;
  removeFromCart(userId: UUID, productId: UUID): Cart | null;
  updateQuantity(userId: UUID, productId: UUID, quantity: number): Cart | null;
  clearCart(userId: UUID): Cart | null;
}
