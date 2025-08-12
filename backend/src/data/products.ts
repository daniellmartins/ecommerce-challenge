import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Smartphone Galaxy Pro',
    price: 899.99,
    originalPrice: 1199.99,
    description: 'Um smartphone avançado com câmera de alta resolução, processador rápido e bateria de longa duração. Perfeito para profissionais e entusiastas de tecnologia.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Eletrônicos',
    inStock: true
  },
  {
    id: 'b2c3d4e5-f6g7-8901-bcde-f21234567891',
    name: 'Notebook UltraBook 15"',
    price: 1299.99,
    description: 'Notebook ultra fino e leve com processador Intel i7, 16GB RAM e SSD 512GB. Ideal para trabalho e estudos.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    category: 'Eletrônicos',
    inStock: true
  },
  {
    id: 'c3d4e5f6-g7h8-9012-cdef-321234567892',
    name: 'Fone de Ouvido Wireless Premium',
    price: 199.99,
    originalPrice: 299.99,
    description: 'Fone de ouvido com cancelamento de ruído ativo, bateria de 30 horas e qualidade de áudio superior.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Áudio',
    inStock: true
  }
];

export const findProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};
