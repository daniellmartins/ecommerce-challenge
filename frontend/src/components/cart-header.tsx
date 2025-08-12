interface CartHeaderProps {
  onClose: () => void;
}

export default function CartHeader({ onClose }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <h2 className="text-lg font-semibold">Carrinho de Compras</h2>
      <button
        onClick={onClose}
        className="rounded-full p-2 hover:bg-gray-100"
        aria-label="Fechar carrinho"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
