'use client';

import { useCartStore } from '@/store/cart-store';
import { CartItem as CartItemType } from '@/types';
import CartHeader from './cart-header';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import CartFooter from './cart-footer';
import LoadingSpinner from './loading-spinner';

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const isLoading = useCartStore((state) => state.isLoading);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
      isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
    }`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleCart}
      />
      
      <div data-testid="cart" className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          <CartHeader onClose={toggleCart} />

          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : !cart || cart.items.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-4">
                {cart.items.map((item: CartItemType) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    isLoading={isLoading}
                    onQuantityChange={handleQuantityChange}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>

          {cart && cart.items.length > 0 && (
            <CartFooter subtotal={cart.subtotal} total={cart.total} />
          )}
        </div>
      </div>
    </div>
  );
}
