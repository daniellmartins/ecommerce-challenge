interface ProductStockProps {
  inStock: boolean;
}

export function ProductStock({ inStock }: ProductStockProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
      <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
        {inStock ? 'Em estoque' : 'Fora de estoque'}
      </span>
    </div>
  );
}
