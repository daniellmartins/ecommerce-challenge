'use client';

import { CartItem as CartItemType } from '@/types';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatters';

interface CartItemProps {
  item: CartItemType;
  isLoading: boolean;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ 
  item, 
  isLoading, 
  onQuantityChange, 
  onRemove 
}: CartItemProps) {
  const handleQuantityDecrease = () => {
    onQuantityChange(item.productId, item.quantity - 1);
  };

  const handleQuantityIncrease = () => {
    onQuantityChange(item.productId, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item.productId);
  };

  return (
    <div className="flex items-center space-x-4 border-b pb-4">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="rounded object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500">
          {formatPrice(item.product.price)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleQuantityDecrease}
          className="rounded border border-gray-300 p-1 hover:bg-gray-50 disabled:opacity-50"
          disabled={isLoading}
          aria-label="Diminuir quantidade"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        
        <button
          onClick={handleQuantityIncrease}
          className="rounded border border-gray-300 p-1 hover:bg-gray-50 disabled:opacity-50"
          disabled={isLoading}
          aria-label="Aumentar quantidade"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <button
        onClick={handleRemove}
        className="text-red-600 hover:text-red-800 disabled:opacity-50"
        disabled={isLoading}
        aria-label="Remover item"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
