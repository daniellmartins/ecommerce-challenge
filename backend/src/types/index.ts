export type UUID = string;

export interface Product {
  id: UUID;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  productId: UUID;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: UUID;
  userId: UUID;
  items: CartItem[];
  total: number;
  subtotal: number;
}

export interface AddToCartRequest {
  productId: UUID;
  quantity: number;
  userId: UUID;
}

export interface UpdateCartRequest {
  productId: UUID;
  quantity: number;
  userId: UUID;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
