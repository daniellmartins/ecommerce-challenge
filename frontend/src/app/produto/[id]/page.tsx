import { notFound } from 'next/navigation';

import { apiService } from '@/services/api';
import { ProductImage } from '@/components/product-image';
import { ProductInfo } from '@/components/product-info';
import { ProductActions } from '@/components/product-actions';

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Product({ params }: ProductProps) {
  const { id } = await params;
  const { data, success } = await apiService.getProduct(id);
  
  if (!success || !data) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage product={data} />
        
        <div className="space-y-6">
          <ProductInfo product={data} />
          <ProductActions product={data} />
        </div>
      </div>
    </div>
  );
}
