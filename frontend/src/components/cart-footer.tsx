import { formatPrice } from '@/utils/formatters';

interface CartFooterProps {
  subtotal: number;
  total: number;
}

export default function CartFooter({ subtotal, total }: CartFooterProps) {
  return (
    <div className="border-t p-4 space-y-4">
      <div className="flex justify-between text-base font-medium">
        <span>Subtotal:</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>{formatPrice(total)}</span>
      </div>
      <button className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition-colors">
        Finalizar Compra
      </button>
    </div>
  );
}
