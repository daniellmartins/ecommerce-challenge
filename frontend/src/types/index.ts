export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
