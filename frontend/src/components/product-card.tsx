import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.id}`} className="group h-full">
      <div data-testid="product-card" className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border h-full flex flex-col">
        <div className="aspect-square relative bg-gray-100 rounded-t-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              -{calculateDiscount(product.originalPrice, product.price)}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Fora de Estoque</span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 data-testid="product-name" className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="space-y-1 mt-auto">
            <div className="flex items-baseline space-x-2">
              <span data-testid="product-price" className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice ? (
              <p className="text-sm text-green-600 font-medium">
                Economize {formatPrice(product.originalPrice - product.price)}
              </p>
            ) : (
              <div className="h-5"></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
