import Image from 'next/image';
import { Product } from '@/types';
import { calculateDiscount } from '@/utils/formatters';

interface ProductImageProps {
  product: Product;
}

export function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
        priority
      />
      {product.originalPrice && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          -{calculateDiscount(product.originalPrice, product.price)}%
        </div>
      )}
    </div>
  );
}
