'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { QuantitySelector } from '@/components/quantity-selector';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartLoading = useCartStore((state) => state.isLoading);

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
  };

  if (!product.inStock) {
    return null;
  }

  return (
    <div className="space-y-4">
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button
        data-testid="add-to-cart"
        onClick={handleAddToCart}
        disabled={cartLoading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {cartLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Adicionando...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Adicionar ao Carrinho</span>
          </>
        )}
      </button>
    </div>
  );
}
