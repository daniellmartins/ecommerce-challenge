import { Cart, CartItem, UUID } from '../types';

export interface ICartRepository {
  findByUserId(userId: UUID): Cart | undefined;
  create(userId: UUID): Cart;
  save(cart: Cart): Cart;
  addItem(userId: UUID, item: CartItem): Cart | null;
  removeItem(userId: UUID, productId: UUID): Cart | null;
  updateItemQuantity(userId: UUID, productId: UUID, quantity: number): Cart | null;
  clear(userId: UUID): Cart | null;
}
