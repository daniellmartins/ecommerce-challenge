import ProductCard from '@/components/product-card';
import { apiService } from '@/services/api';

export default async function Home() {
  const { data: products } = await apiService.getProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo à E-Shop
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubra os melhores produtos com preços incríveis e qualidade garantida.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos em Destaque</h2>
        
        {products?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
