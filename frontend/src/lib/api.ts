import { Product, ApiResponse } from '@/types';

/**
 * Fetches all products from the API
 * @returns Promise<Product[]> List of products or empty array in case of error
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const { data, success, error }: ApiResponse<Product[]> = await response.json();
    
    if (success && data) {
      return data;
    } else {
      throw new Error(error || 'Error loading products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
