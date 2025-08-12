import { Product } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { ProductStock } from '@/components/product-stock';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div data-testid="product-info">
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.originalPrice && (
          <p className="text-sm text-green-600 font-medium">
            Você economiza {formatPrice(product.originalPrice - product.price)}
          </p>
        )}
      </div>

      <ProductStock inStock={product.inStock} />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Descrição</h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
