'use client';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  const handleDecrease = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuantityChange(Math.max(1, parseInt(e.target.value) || 1));
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
        Quantidade:
      </label>
      <div className="flex items-center border border-gray-300 rounded">
        <button
          onClick={handleDecrease}
          className="px-3 py-2 hover:bg-gray-50"
          disabled={quantity <= 1}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleInputChange}
          className="w-16 px-3 py-2 text-center border-0 focus:ring-0"
        />
        <button
          onClick={handleIncrease}
          className="px-3 py-2 hover:bg-gray-50"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
