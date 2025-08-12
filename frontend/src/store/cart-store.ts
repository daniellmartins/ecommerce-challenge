'use client';

import { create } from 'zustand';
import { Cart } from '@/types';
import { apiService } from '@/services/api';
import { UserUtils } from '@/utils/user';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  userId: string | null;
  
  // Actions
  setCart: (cart: Cart | null) => void;
  setLoading: (loading: boolean) => void;
  setUserId: (userId: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Async actions
  initializeUser: () => void;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  isCartOpen: false,
  userId: null,

  setCart: (cart) => set({ cart }),
  setLoading: (isLoading) => set({ isLoading }),
  setUserId: (userId) => set({ userId }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  initializeUser: () => {
    if (typeof window !== 'undefined') {
      const userId = UserUtils.getUserId();
      set({ userId });
    }
  },

  refreshCart: async () => {
    set({ isLoading: true });
    try {
      const response = await apiService.getCart();
      if (response.success && response.data) {
        set({ cart: response.data });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    set({ isLoading: true });
    try {
      const response = await apiService.addToCart({ productId, quantity });
      if (response.success && response.data) {
        set({ cart: response.data, isCartOpen: true });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromCart: async (productId: string) => {
    set({ isLoading: true });
    try {
      const response = await apiService.removeFromCart(productId);
      if (response.success && response.data) {
        set({ cart: response.data });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    set({ isLoading: true });
    try {
      const response = await apiService.updateCartQuantity(productId, quantity);
      if (response.success && response.data) {
        set({ cart: response.data });
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
