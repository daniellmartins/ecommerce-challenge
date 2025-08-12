import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
        <p className="text-gray-600 mb-4">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <div className="space-x-4">
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Voltar à Home
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
