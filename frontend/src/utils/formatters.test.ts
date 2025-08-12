import { formatPrice, calculateDiscount } from './formatters';

describe('formatPrice', () => {
  test('should format values as Brazilian currency (BRL)', () => {
    expect(formatPrice(10.50)).toBe('R$\u00A010,50');
    expect(formatPrice(100)).toBe('R$\u00A0100,00');
    expect(formatPrice(1234.56)).toBe('R$\u00A01.234,56');
  });

  test('should format decimal values correctly', () => {
    expect(formatPrice(0.99)).toBe('R$\u00A00,99');
    expect(formatPrice(15.9)).toBe('R$\u00A015,90');
    expect(formatPrice(299.99)).toBe('R$\u00A0299,99');
  });

  test('should format large values correctly', () => {
    expect(formatPrice(10000)).toBe('R$\u00A010.000,00');
    expect(formatPrice(123456.78)).toBe('R$\u00A0123.456,78');
    expect(formatPrice(1000000)).toBe('R$\u00A01.000.000,00');
  });

  test('should format zero correctly', () => {
    expect(formatPrice(0)).toBe('R$\u00A00,00');
  });

  test('should handle negative values', () => {
    expect(formatPrice(-10.50)).toBe('-R$\u00A010,50');
    expect(formatPrice(-100)).toBe('-R$\u00A0100,00');
  });

  test('should maintain precision with floating point numbers', () => {
    expect(formatPrice(19.99)).toBe('R$\u00A019,99');
    expect(formatPrice(0.01)).toBe('R$\u00A00,01');
    expect(formatPrice(999.99)).toBe('R$\u00A0999,99');
  });
});

describe('calculateDiscount', () => {
  test('should calculate discount correctly with integer values', () => {
    expect(calculateDiscount(100, 80)).toBe(20);
    expect(calculateDiscount(200, 150)).toBe(25);
    expect(calculateDiscount(50, 25)).toBe(50);
  });

  test('should calculate discount with decimal values and round', () => {
    expect(calculateDiscount(100, 66.67)).toBe(33);
    expect(calculateDiscount(299.99, 199.99)).toBe(33);
    expect(calculateDiscount(15.50, 12.40)).toBe(20);
  });

  test('should return 0 when there is no discount', () => {
    expect(calculateDiscount(100, 100)).toBe(0);
    expect(calculateDiscount(50.99, 50.99)).toBe(0);
  });

  test('should return 100 for total discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
    expect(calculateDiscount(299.99, 0)).toBe(100);
  });

  test('should handle edge cases', () => {
    expect(calculateDiscount(100, 120)).toBe(-20);
    expect(calculateDiscount(0.01, 0.005)).toBe(50);
    expect(calculateDiscount(1000000, 500000)).toBe(50);
  });

  test('should correctly round values with many decimal places', () => {
    expect(calculateDiscount(100, 66.666)).toBe(33);
    expect(calculateDiscount(100, 33.334)).toBe(67);
    expect(calculateDiscount(77.77, 55.55)).toBe(29);
  });

  test('should handle 1 cent discount', () => {
    expect(calculateDiscount(1.00, 0.99)).toBe(1);
    expect(calculateDiscount(10.00, 9.99)).toBe(0);
  });
});
