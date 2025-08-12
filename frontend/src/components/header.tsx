import Link from 'next/link';

import CartButton from './cart-button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900">E-Shop</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Início</Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">Produtos</Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">Sobre</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
