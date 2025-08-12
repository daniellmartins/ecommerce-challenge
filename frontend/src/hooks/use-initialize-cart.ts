'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';

export function useInitializeCart() {
  const refreshCart = useCartStore((state) => state.refreshCart);
  const initializeUser = useCartStore((state) => state.initializeUser);

  useEffect(() => {
    // Primeiro inicializar o usuário
    initializeUser();
    // Depois carregar o carrinho
    refreshCart();
  }, [refreshCart, initializeUser]);
}
