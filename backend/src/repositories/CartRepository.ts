import { v4 as uuidv4 } from 'uuid';
import { Cart, CartItem } from '../types';
import { ICartRepository } from '../interfaces';

export class CartRepository implements ICartRepository {
  private carts: Map<string, Cart> = new Map();

  findByUserId(userId: string): Cart | undefined {
    return this.carts.get(userId);
  }

  create(userId: string): Cart {
    const cartId = uuidv4();
    const cart: Cart = {
      id: cartId,
      userId,
      items: [],
      total: 0,
      subtotal: 0
    };
    this.carts.set(userId, cart);
    return cart;
  }

  save(cart: Cart): Cart {
    this.carts.set(cart.userId, cart);
    return cart;
  }

  addItem(userId: string, item: CartItem): Cart | null {
    let cart = this.findByUserId(userId);
    if (!cart) {
      cart = this.create(userId);
    }

    const existingItemIndex = cart.items.findIndex(cartItem => cartItem.productId === item.productId);

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    this.updateCartTotals(cart);
    return this.save(cart);
  }

  removeItem(userId: string, productId: string): Cart | null {
    const cart = this.findByUserId(userId);
    if (!cart) return null;

    cart.items = cart.items.filter(item => item.productId !== productId);
    this.updateCartTotals(cart);
    return this.save(cart);
  }

  updateItemQuantity(userId: string, productId: string, quantity: number): Cart | null {
    const cart = this.findByUserId(userId);
    if (!cart) return null;

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex < 0) return null;

    if (quantity <= 0) {
      return this.removeItem(userId, productId);
    }

    cart.items[itemIndex].quantity = quantity;
    this.updateCartTotals(cart);
    return this.save(cart);
  }

  clear(userId: string): Cart | null {
    const cart = this.findByUserId(userId);
    if (!cart) return null;

    cart.items = [];
    this.updateCartTotals(cart);
    return this.save(cart);
  }

  private updateCartTotals(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cart.total = cart.subtotal;
  }
}
