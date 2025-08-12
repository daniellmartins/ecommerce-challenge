export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      <svg className="h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
        />
      </svg>
      <p>Seu carrinho está vazio</p>
    </div>
  );
}
