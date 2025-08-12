/**
 * Formats a numeric value as Brazilian currency (BRL)
 * @param price - The value to be formatted
 * @returns String formatted as Brazilian currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

/**
 * Calculates the discount percentage between two prices
 * @param originalPrice - Original product price
 * @param currentPrice - Current price with discount
 * @returns Rounded discount percentage
 */
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
