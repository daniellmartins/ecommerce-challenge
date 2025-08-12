import { Product, Cart, AddToCartRequest, ApiResponse } from '@/types';
import { UserUtils } from '@/utils/user';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/api`;

class ApiService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Connection error with server'
      };
    }
  }

  async getProducts(): Promise<ApiResponse<Product[]>> {
    return this.fetchApi<Product[]>('/products');
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.fetchApi<Product>(`/products/${id}`);
  }

  async getCart(): Promise<ApiResponse<Cart>> {
    const userId = UserUtils.getUserId();
    return this.fetchApi<Cart>(`/cart?userId=${encodeURIComponent(userId)}`);
  }

  async addToCart(request: AddToCartRequest): Promise<ApiResponse<Cart>> {
    const userId = UserUtils.getUserId();
    const requestWithUserId = { ...request, userId };
    
    return this.fetchApi<Cart>('/cart/add', {
      method: 'POST',
      body: JSON.stringify(requestWithUserId),
    });
  }

  async removeFromCart(productId: string): Promise<ApiResponse<Cart>> {
    const userId = UserUtils.getUserId();
    return this.fetchApi<Cart>(`/cart/remove/${productId}?userId=${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    });
  }

  async updateCartQuantity(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
    const userId = UserUtils.getUserId();
    return this.fetchApi<Cart>('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity, userId }),
    });
  }
}

export const apiService = new ApiService();
